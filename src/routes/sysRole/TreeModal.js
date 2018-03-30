import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Cascader, Button, Icon, Tree } from 'antd'
const TreeNode = Tree.TreeNode
const modal = ({
  state = {
    checkedKeys: [],
  },
  treeDate,
  onOk,
  ...modalProps
  }) => {
  const loop = data => data.map((treeDate) => {
    if (treeDate.children) {
      return (
        <TreeNode key={treeDate.id} title={treeDate.name} value={treeDate.route}>
          {loop(treeDate.children)}
        </TreeNode>
      )
    }
    return <TreeNode key={treeDate.id} title={treeDate.name} value={treeDate.route} />
  })
  const handleOk = () => {
    onOk(state)
  }
  const onCheck = (checkedKeys) => {
    state.checkedKeys = checkedKeys.checked
  }
  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }
  return (
    <Modal {...modalOpts}>
      <Tree checkable
            checkStrictly
        onCheck={onCheck}
            defaultCheckedKeys={state.checkedKeys}
      >
        {loop(treeDate) }
      </Tree>
    </Modal>
  )
}
modal.propTypes = {
  state: PropTypes.object,
  type: PropTypes.string,
  treeDate: PropTypes.object,
  onOk: PropTypes.func,
}
export default Form.create()(modal)

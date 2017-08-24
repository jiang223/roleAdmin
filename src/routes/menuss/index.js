import React from 'react'
import Menus from '../../components/Layout/Menu.js'
/* import { classnames, config, menu } from '../../utils'*/
import PropTypes from 'prop-types'
import { connect } from 'dva'

let { classnames, config, menu } = require('../../utils')

const { prefix } = config

alert(menu)
const Menuss = ({ children, location, dispatch, menuss, loading }) => {
  const { navOpenKeys, list } = menuss
  const listProps = {
    dataSource: list,
    list,
    // loading: loading.effects['menuss/query'],
  }
  const menusProps = {
    menu: list,
    siderFold: false,
    darkTheme: false,
    isNavbar: false,
    switchMenuPopover () {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    location,
    navOpenKeys,
    changeOpenKeys (openKeys) {
      localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys))
      // navOpenKeys=openKeys;
      // menusProps.navOpenKeys=openKeys;
      dispatch({ type: 'menuss/handleNavOpenKeys', payload: { navOpenKeys: openKeys } })
    },
  }

  return (
    <div>
      <Menus {...menusProps} />
    </div>
  )
}
Menuss.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  menuss: PropTypes.object,
  loading: PropTypes.object,
}

export default connect(({ menuss, loading }) => ({ menuss, loading }))(Menuss)

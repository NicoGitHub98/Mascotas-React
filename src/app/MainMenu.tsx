import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"
import { logout } from "../user/userService"

export default function MainMenu() {
  const logoutApp = async () => {
    await logout()
  }

  return (
    <div>
      <NavLink to="/info" className="menu_item btn btn-sm btn-link">Sesión</NavLink><br />
      <NavLink to="/password" className="menu_item btn btn-sm btn-link">Password</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />

      <h6 className="menu_section">Personas</h6>
      <NavLink to="/browsePeople" className="menu_item btn btn-sm btn-link">Buscar Amigos</NavLink><br />

      <h6 className="menu_section">Publicaciones</h6>
      <NavLink to="/feed" className="menu_item btn btn-sm btn-link">Mi Feed</NavLink><br />
      <NavLink to="/feed" className="menu_item btn btn-sm btn-link">Explorar</NavLink><br />

      <h6 className="menu_section">Perfil</h6>
      <NavLink to="/profile" className="menu_item btn btn-sm btn-link">Editar</NavLink><br />
      <NavLink to="/my-feed" className="menu_item btn btn-sm btn-link">Mi Muro</NavLink><br />

      <h6 className="menu_section">Mascotas</h6>
      <NavLink to="/pets" className="menu_item btn btn-sm btn-link">Lista</NavLink><br />
    </div>
  )
}

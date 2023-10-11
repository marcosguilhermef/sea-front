export default function Asside(){
    return(
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: ".8"}}/>
                <span className="brand-text font-weight-light">AdminLTE 3</span>
            </a>

            <div className="sidebar">
                <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">

                    <li className="nav-item menu-open">
                    <ul className="nav nav-treeview">
                        <li className="nav-item">
                        <a href="/users" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Lista de usuários</p>
                        </a>
                        </li>
                        <li className="nav-item">
                        <a href="/users/add-user" className="nav-link">
                            <i className="far fa-circle nav-icon"></i>
                            <p>Adicionar usuários</p>
                        </a>
                        </li>
                    </ul>
                    </li>
                </ul>
                </nav>
            </div>
        </aside>
    )
}
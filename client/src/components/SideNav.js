import React from 'react';

function SideNav(props) {
    return (
        <aside>
            <div id="mySidenav" class="sidenav">
                <a href="#" key={props.id}>
                    {props.title}
                </a>
            </div>
        </aside>
    );
}
export default SideNav;
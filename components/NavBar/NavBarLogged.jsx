import NavBar from './NavBar';
import {TbVinyl } from "react-icons/tb";

export default function NavBarLogged() {

    const ITEMS = [
        {
            label: 'Recommendation',
            href: '/recommendation'
        },
        {
            label: 'Playlist',
            href: '/playlist',
        },
        {
            label: 'Last Purchases',
            href: '/purchases'
        },
        {
            label: 'Profile',
            href: '/profile'
        },
    ];

    return (
        <NavBar items={ITEMS}></NavBar>
    );
}
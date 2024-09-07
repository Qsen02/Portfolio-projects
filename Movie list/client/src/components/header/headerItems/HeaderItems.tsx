import { NavLink } from "react-router-dom"

type HeaderItemsProps = {
    name: string,
    link: string
}

export default function HeaderItems({
    name, link
}: HeaderItemsProps) {
    return (
        <li><NavLink to={link}>{name}</NavLink></li>
    )
}
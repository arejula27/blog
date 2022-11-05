import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { classNames } from "../../utils/";

interface route {
    label: string;
    route: string;
}

const routes: route[] = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "Blog", route: "/blog" },
];

export const Navbar = () => {
    const { asPath } = useRouter();

    return (
        <nav className="relative w-full flex flex-wrap  justify-start py-3 px-10 shadow-lg navbar navbar-expand-lg navbar-light bg-secondary">
            {routes.map((route, index) => {
                return (
                    <Link
                        className={classNames(
                            asPath === route.route
                                ? " text-paragraph"
                                : "text-primary hover:bg-gray-700 hover:text-headline",
                            "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        key={index}
                        href={route.route}
                    >
                        {route.label}
                    </Link>
                );
            })}

            <h1 className="text-headline px-7  text-3xl absolute  right-1 flex ">
                Íñigo Aréjula
            </h1>
        </nav>
    );
};

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
    { label: "Blog", route: "/blog" },
    { label: "Contat me", route: "/contact" },
];

export const Navbar = () => {
    const { asPath } = useRouter();

    return (
        <nav className="relative w-full flex flex-wrap  justify-start py-3 px-10 shadow-lg navbar navbar-expand-lg navbar-light bg-primary">
            {routes.map((route, index) => {
                return (
                    <Link
                        className={classNames(
                            asPath === route.route
                                ? " text-headline font-bold"
                                : "text-paragraph hover:bg-gray-700 hover:text-tertiary",
                            "block px-3 py-2 rounded-md text-base font-medium"
                        )}
                        key={index}
                        href={route.route}
                    >
                        {route.label}
                    </Link>
                );
            })}

            <h1 className="text-paragraph px-7  text-3xl absolute  right-1 flex ">
                Íñigo Aréjula
            </h1>
        </nav>
    );
};

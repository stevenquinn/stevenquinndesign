import * as React from "react"

import { Link } from "gatsby"

export default function Layout ({ location, title, children }) {

    const rootPath = `${__PATH_PREFIX__}/`
    const isRootPath = location.pathname === rootPath
    let header

    if (isRootPath) {
        header = (
            <h1 className="main-heading">
                <Link to="/">{title}</Link>
            </h1>
        )
    } else {
        header = (
            <Link className="header-link-home" to="/">
                {title}
            </Link>
        )
    }

    return (
        <div className="font-body" data-is-root-path={isRootPath}>

            <header className="container mx-auto mb-8 mt-8">
                <div className="text-center font-bold text-4xl mb-1 tracking-tight">Steven Quinn</div>
                <p className="text-center text-slate-500 tracking-widest">I write code and make things.</p>
                <nav className="flex justify-center gap-6">
                    <div>
                        <Link to="/" className="text-slate-600 no-underline font-semibold">Blog</Link>
                    </div>
                    <div>
                        <Link to="/about" className="text-slate-600 no-underline font-semibold">About</Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto max-w-4xl px-8">{ children }</main>
            <footer></footer>
        </div>
    )
}

import * as React from "react"

import classNames from 'classnames'
import { Link } from "gatsby"

export default function Layout ({ location, title, children }) {

    const setDark = () => {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
        setTheme('dark')
    }

    const setLight = () => {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
        setTheme('light')
    }

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            setDark()
        } else {
            setLight()
        }
    }

    const [theme, setTheme] = React.useState(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light')

    React.useEffect(() => {
        applyTheme(theme)
    }, [theme])


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
        <div className="font-body dark:bg-zinc-900 -mt-2" data-is-root-path={isRootPath}>

            <header className="flex container mx-auto mt-2">
                <div className="ml-auto flex gap-1">
                    <button 
                        onClick={() => setLight() } 
                        className={classNames({ 
                            'text-slate-800 dark:text-zinc-500': theme == 'dark',
                            'text-slate-800 dark:text-zinc-700': theme != 'dark',
                        })}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                        </svg>
                    </button>
                    <button 
                        onClick={() => setDark() } 
                        className={classNames({ 
                            'text-slate-800 dark:text-zinc-100': theme == 'dark',
                            'text-slate-200 dark:text-zinc-800': theme != 'dark',
                        })}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                    </button>
                </div>
            </header>
            <header className="container mx-auto mb-8 mt-8">
                <div className="text-center font-bold text-4xl mb-1 tracking-tight dark:text-zinc-200">Steven Quinn</div>
                <p className="text-center text-slate-500 dark:text-zinc-600 tracking-widest">I write code and make things.</p>
                <nav className="flex justify-center gap-6">
                    <div>
                        <Link to="/" className="text-slate-600 dark:text-zinc-300 no-underline font-semibold">Blog</Link>
                    </div>
                    <div>
                        <Link to="/about" className="text-slate-600 dark:text-zinc-300 no-underline font-semibold">About</Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto max-w-4xl px-8">{ children }</main>
            <footer></footer>
        </div>
    )
}

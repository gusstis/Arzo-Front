import Link from 'next/link'
import {useState} from 'react'
import Image from 'next/image'

function NavLink({to, children}) {
    return <Link href={to} className={`mx-4`}>{children}</Link>
}

function MobileNav({open, setOpen}) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <Link href="/" className="text-xl font-semibold">LOGO</Link>
            </div>
            <div className="flex flex-col ml-4">
                <Link href="/about" className="text-xl font-medium my-4" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>About</Link>
                <Link href="/contact" className="text-xl font-normal my-4" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>Contact</Link>
            </div>  
        </div>
    )
}


export default function Navbar() {
    const [open, setOpen] = useState(false)
        return (
            <nav className="flex filter drop-shadow-md bg-white px-4 py-4 h-20 items-center">
                <MobileNav open={open} setOpen={setOpen}/>
                <div className="w-3/12 flex items-center">
                    <Link href="/"className="text-2xl font-semibold" >
                    <div>
                      <Image
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Aca va logo arzo"
                      width={100}
                      height={100}
                      />
                    </div>
                    </Link>
                </div>
                <div className="w-9/12 flex justify-end items-center">
    
                    <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                        setOpen(!open)
                    }}>
                        {/* hamburger button */}
                        <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                        <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                        <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                    </div>
    
                    <div className="hidden md:flex">
                        <NavLink to="/contact">
                            CONTACT
                        </NavLink>
                        <NavLink to="/about">
                            ABOUT
                        </NavLink>
                    </div>
                </div>
            </nav>
        )
    }

    

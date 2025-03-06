'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Ensure this runs only on the client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedActive = localStorage.getItem('active');
      if (storedActive) setActive(storedActive);
    }
  }, []);

  useEffect(() => {
    if (active !== null) {
      localStorage.setItem('active', active);
    }
  }, [active]);

  return (
    <nav className="w-full bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto p-4 flex justify-between items-center md:w-4/5">
        <Link href={"/"}><Image src={"/ProlanceHub.png"} height={150} width={150} alt='ProlanceHub'></Image></Link>

        <div className="md:hidden flex gap-3">
          {/* Ensure session.user exists before accessing properties */}
          {session?.user && (
            <Link href={`/${session.user.email.split('@')[0]}?role=${session.user.role}`} onClick={() => setMenuOpen(false)}>
              <Image src={session.user.image} alt={session.user.name} width={40} height={40} className="rounded-full" />
            </Link>
          )}
          {/* Hamburger Menu for Mobile */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10 text-lg items-center">
          <Link href="/home" onClick={() => setActive('home')} className={active === 'home' ? 'text-gray-500' : 'text-black'}>
            Home
          </Link>
          <Link href="/projects" onClick={() => setActive('projects')} className={active === 'projects' ? 'text-gray-500' : 'text-black'}>
            Projects
          </Link>
          <Link href="/findfreelancers" onClick={() => setActive('find-freelancers')} className={active === 'find-freelancers' ? 'text-gray-500' : 'text-black'}>
            Find Freelancers
          </Link>
          <Link href="/insights" onClick={() => setActive('insights')} className={active === 'insights' ? 'text-gray-500' : 'text-black'}>
            AI Insights
          </Link>
          {!session ? (
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition" onClick={() => router.push('/role')}>SignUp/Login</button>
          ) : (
            <button onClick={() => signOut('google')}>Logout</button>
          )}
          {session?.user && (
            <Link href={`/${session.user.email.split('@')[0]}?role=${session.user.role}`} className="flex items-center gap-2">
              <Image src={session.user.image} alt={session.user.name} width={40} height={40} className="rounded-full" />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-slate-100 shadow-lg flex flex-col items-center gap-4 py-4">
          <Link href="/home" onClick={() => { setActive('home'); setMenuOpen(false); }}>Home</Link>
          <Link href="/projects" onClick={() => { setActive('projects'); setMenuOpen(false); }}>Projects</Link>
          <Link href="/findfreelancers" onClick={() => { setActive('find-freelancers'); setMenuOpen(false); }}>Find Freelancers</Link>
          <Link href="/insights" onClick={() => { setActive('insights'); setMenuOpen(false); }}>AI Insights</Link>
          {!session ? (
            <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition" onClick={() => { router.push('/role'); setMenuOpen(false); }}>SignUp/Login</button>
          ) : (
            <button onClick={() => { signOut('google'); setMenuOpen(false); }}>Logout</button>
          )}
        </div>
      )}
    </nav>
  );
};

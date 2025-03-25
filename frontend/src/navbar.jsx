import './navbar.css'
import Button from './button'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Navbar () {
    const navigate = useNavigate();

    return (
        <header>
        <nav>
          <div className="nav-container">
            {/* Logo */}
            <NavLink to="/" className="logo text-[#2C3E50]">Interview Buddy</NavLink>
            
            {/* Navigation Links */}
            <div className="nav-links flex justify-center items-center rounded-full ">
              <NavLink to="/" className={({isActive}) => isActive ? "text-[#2C3E50] hover:text-[#2C3E50] underline" : "text-[#34495E] hover:text-[#2C3E50]"}>Home</NavLink>
              <NavLink to="/about" className={({isActive}) => isActive ? "text-[#2C3E50] hover:text-[#2C3E50] underline" : "text-[#34495E] hover:text-[#2C3E50]"}>About Us</NavLink>
              <NavLink to="/contact" className={({isActive}) => isActive ? "text-[#2C3E50] hover:text-[#2C3E50] underline" : "text-[#34495E] hover:text-[#2C3E50]"}>Contact Us</NavLink>
              
              <Button 
              children ={"Sign Up"} 
              className={"text-sm rounded-full px-4 py-[0.5rem] mr-[-1rem]"}
              onClick={()=>{navigate('/signup')}}/>
              <Button 
              children ={"Login"} 
              className={"text-sm rounded-full py-[0.5rem]"}
              onClick={()=>{navigate('/login')}}/> 
              
              
            </div>
          </div>
        </nav>
      </header>
    )
}
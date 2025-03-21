import { Link } from 'react-router-dom';

function NavBar(){
        return(
        <nav>
            <ul>
                <li><Link to ="/">Home</Link></li>
                <li><Link to ="/projects">projects</Link></li>
                <li><Link to ="/skills">skills</Link></li>
                <li><Link to ="/about">about</Link></li>
                <li><Link to ="/contact">contact</Link></li>
                
            </ul>


           
        </nav>
        );

}
export default NavBar;
import './NavBar1.css';

export default function NavBar1() {
    return (
        <div className='NavBar1'>

            <h1 className='WebsiteTitle'>Sauce</h1>

            <div className='Btn-Log-Container'>
                <button className='Log-Btn'>
                    Sign In
                </button>
                <button className='Log-Btn'>
                    Register
                </button>
            </div>

        </div>
    )
};
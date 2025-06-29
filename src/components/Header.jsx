import './components.css'

const Header = () => {

  return (
     <div className='flex-row main-head-wrapper'>
          <img className='astronaut-icon App-logo' src="icons/atronaut-svgrepo-com.svg" alt="" />
          <p className='main-head'><span className='orange'>NASA</span> EXPLORER</p>
     </div>
  );
};

export default Header;

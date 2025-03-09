import { useNavigate } from 'react-router-dom';
import './App.css';

function DefaultHome() {
  const navigate = useNavigate();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Virtual Instruments</h1>
      </header>
      <div className="instruments">
        <div className="instrument-card" onClick={() => navigate('/piano')}>
          <img src='https://th.bing.com/th/id/OIP.cZWHxwRg5MD65UFuGOkckgHaHo?pid=ImgDet&w=190&h=196&c=7&dpr=1.2' alt=''/>
          <h3>Piano</h3>
        </div>
      </div>
    </div>
  );
}

export default DefaultHome;

import { React, Netinfo, useEffect } from '@libraries';
import { showError } from '@utils';

const Network = () => {
  // const [connected, setConnection] = useState(false);

  useEffect(() => {
    const connectionListener = Netinfo.addEventListener(state => {
      const { isConnected } = state;
      if (!isConnected) {
        showError('Koneksi Jaringan Terputus!', {
          duration: 100000,
          hideOnPress: true
        });
      }
    });

    return () => {
      // remove listener
      connectionListener();
    };
  }, []);

  return <React.Fragment />;
};

export default React.memo(Network);

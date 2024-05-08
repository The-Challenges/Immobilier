import React, { useState } from 'react';
import RequestsList from './requestreceived';
import AllRequests from './AllRequests';

const App = () => {
  const [requests, setRequests] = useState([
    { id: '1', houseId: '1234', buyerName: 'John Doe', offerPrice: '200000', image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg', status: 'pending' },
    { id: '2', houseId: '5678', buyerName: 'Jane Smith', offerPrice: '250000', image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg', status: 'pending' },
    { id: '3', houseId: '9012', buyerName: 'Bob Johnson', offerPrice: '300000', image: 'https://img.staticmb.com/mbcontent/images/crop/uploads/2022/12/Most-Beautiful-House-in-the-World_0_1200.jpg', status: 'pending' }
  ]);

  const handleRequestUpdate = (id, newStatus) => {
    setRequests(prevRequests =>
      prevRequests.map(request => 
        request.id === id ? { ...request, status: newStatus } : request
      )
    );
  };

  return (
    <div>
      <RequestsList requests={requests} onStatusChange={handleRequestUpdate} />
      <AllRequests requests={requests} />
    </div>
  );
};

export default App;

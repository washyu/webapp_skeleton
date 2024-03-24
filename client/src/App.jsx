import { useState, useEffect } from 'react';
import axios from 'axios';
import { ConfigProvider, theme,  Table, Button } from 'antd';

function App() {
  const [data, setData] = useState([]);
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleClick = () => {
    setIsDarkMode((prev) => !prev);
  }

  const renderUpdatedField = (text, record, fieldName) => {
    const update = record.UserUpdates.find((update) => update.field_name === fieldName);
    return update ? update.field_value : text;
  };

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => renderUpdatedField(text, record, 'username'),
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      render: (text, record) => renderUpdatedField(text, record, 'first_name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      render: (text, record) => renderUpdatedField(text, record, 'last_name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => renderUpdatedField(text, record, 'email'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text, record) => renderUpdatedField(text, record, 'address'),
    },
  ];

  return (
    <ConfigProvider theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <Button onClick={handleClick}>
        Change Theme to {isDarkMode ? "Light" :"Dark" }
      </Button>
      <div>
        <Table dataSource={data} columns={columns} pagination={false} rowKey="id"/>
      </div>
    </ConfigProvider>
  );
}

export default App;
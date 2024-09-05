import React, { useState } from 'react';
import { data } from '../TransferList/data';

const styles = {
  Container: {
    display: 'flex',
  },
  LeftContainer: {
    width: '200px',
    height: '200px',
    border: '1px solid',
  },
  Arrows: {
    width: '50px',
    display: 'flex',
    'flex-wrap': 'wrap',
    'align-content': 'stretch',
  },
};

export const TransferList = () => {
  const [leftData, setLeftData] = useState(data);
  const [rightData, setRightData] = useState([]);
  const [leftDataSelected, setLeftDataSelected] = useState([]);
  const [rightDataSelected, setRightDataSelected] = useState([]);

  const handleLeftClick = (e) => {
    const newData = leftData.map((el) => {
      if (el.id === e.id) {
        return {
          ...el,
          checked: !el.checked,
        };
      }
      return el;
    });
    const selectedItems = newData.filter((el) => el.checked);
    setLeftData(newData);
    setLeftDataSelected(selectedItems);
  };

  const handleRightClick = (e) => {
    const newData = rightData.map((el) => {
      if (el.id === e.id) {
        return {
          ...el,
          checked: !el.checked,
        };
      }
      return el;
    });
    const selectedItems = newData.filter((el) => el.checked);
    setRightData(newData);
    setRightDataSelected(selectedItems);
  };

  const moveItems = (direction) => {
    if (direction === 'R') {
      const newData = leftDataSelected.map((e) => {
        return {
          ...e,
          checked: false,
        };
      });
      setRightData((prevRightData) => [...prevRightData, ...newData]);
      setLeftData(leftData.filter((e) => !e.checked));
    } else {
      const newData = rightDataSelected.map((e) => {
        return {
          ...e,
          checked: false,
        };
      });
      setLeftData((prevLefttData) => [...prevLefttData, ...newData]);
      console.log(rightData)
      setRightData(rightData.filter((e) => !e.checked));
    }
  };

  return (
    <div style={styles.Container}>
      <div style={styles.LeftContainer}>
        {leftData.map((e) => (
          <p
            key={e.id}
            style={{
              border: e.checked ? '1px solid red' : 'none',
            }}
            onClick={() => handleLeftClick(e)}
          >
            {e.title}
          </p>
        ))}
      </div>
      <div style={styles.Arrows}>
        <button onClick={() => moveItems('R')}>Rigth {'->'}</button>
        <button onClick={() => moveItems('L')}>Left {'<-'}</button>
      </div>
      <div style={styles.LeftContainer}>
        {rightData.map((e) => (
          <p
            key={e.id}
            style={{
              border: e.checked && '1px solid red',
            }}
            onClick={() => handleRightClick(e)}
          >
            {e.title}
          </p>
        ))}
      </div>
    </div>
  );
};

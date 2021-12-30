import './App.css';
import { useState, useCallback, useEffect } from 'react';

let createMatrix = (n, m) => {
  let matrix = [];
  let initcolor = "#000000";

  for (let i = 0; i < n; i++) {
    matrix.push([]);
    for (let j = 0; j < m; j++) {
      matrix[i].push(initcolor);
    }
  }
  return matrix;
}
let listColors = [{col:'#000000', isSelected: false}, {col: '#FF5733', isSelected: false}, {col: '#087E17', isSelected: false}]

function App() {
  const [table, setTable] = useState({row: 10, column: 10});
  const [matrix, setMatrix] = useState(createMatrix(table.row, table.column));
  const [colors, setListColors] = useState(listColors);
  const [color, setColor] = useState('#000000');

  let changeColor = (colorSelected, indexColor) => {
    setColor(colorSelected)
    let copyColors = colors.map((el,i)=> {
      if(i===indexColor){
        el.isSelected = true
      }else{
        el.isSelected = false
      }
      return el
    })
    setListColors(copyColors)
  }
  
  let handleClick = (row, column) => {
    let matrixCopy = [...matrix];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (i === row && column === j) {
          matrixCopy[i][j] = color;
        }
      }
    }
    setMatrix(matrixCopy)
  }

  let changeTable = (event) => {
    event.preventDefault()
    setMatrix(createMatrix(table.row, table.column))
  }

  return (
    <div className="App">
      <form className='form_info_table' onSubmit={changeTable}>
        <label>
          Filas:
          {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
          <input type="text" value={table.row} onChange={(e) => setTable({row: e.target.value, column: table.column})}/>
        </label>
        <label>
          Columnas:
          <input type="text" value={table.column} onChange={(e) => setTable({row: table.row, column: e.target.value}) }/>
        </label>
        <input type="submit" value="Modificar Tabla" />
      </form>
      <table className='grid'>
        <tbody>
          {
            matrix.map((row, i) => {
              return <tr key={i}>
                {row.map((column, j) => {
                  return <td key={j} style={{ backgroundColor: column }} onClick={() => { handleClick(i, j) }}>
                  </td>
                })}
              </tr>
            })
          }
        </tbody>
      </table>
      <div>
        <h2>Select color and click on any cell</h2>
        <div className='listColors'>
        {
          colors.map((colorSelected,indexColor) => {
            return <div className={`boxChangeColor ${colorSelected.isSelected ? "addBorder": ""}`} key={indexColor} style={{backgroundColor: colorSelected.col}} onClick={() => {changeColor(colorSelected.col, indexColor)}}></div>
          })
        }
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Table, TableBody, TableCell, TableContainer, TableRow, TableHead  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// https://material-ui.com/components/tables/

class PositionsTable extends Component {
  constructor (props) {
    super(props);
  }
  
  // are we receiving table info as props here 
  render() {
    
    // const rows = this.props
    const rows = [
        {currency: 'USD', base_value: 1, usd_value: 1}, 
        {currency: 'JPY', base_value: 100, usd_value: 1},
        {currency: 'EUR', base_value: 120, usd_value: 100},
    ]
    
    return (
      <>
      <div className="wrapper_on_table">
        <TableContainer component={Paper}>
          <Table className='tabletest' aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Value(local)</TableCell>
                <TableCell align="right">Value(base)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.currency}>
                  <TableCell component="th" scope="row">
                    {row.currency}
                  </TableCell>
                  <TableCell align="right">{row.base_value}</TableCell>
                  <TableCell align="right">{row.usd_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      </>
    );
  }
}

export default PositionsTable;

/*

<>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Currency</TableCell>
                <TableCell align="right">Value(in base currency)</TableCell>
                <TableCell align="right">Value(USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.currency}>
                  <TableCell component="th" scope="row">
                    {row.currency}
                  </TableCell>
                  <TableCell align="right">{row.base_value}</TableCell>
                  <TableCell align="right">{row.usd_value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>

*/
import React, { Component, Fragment } from 'react';
import { TableCell, Checkbox, Tooltip } from '@material-ui/core';

import Colors from '../../../utils/Colors';

const styles = {
  tableCell: {
    padding: '0px 0px 0px 16px'
  },
  tableCellFirst: {
    paddingLeft: 16
  },
  tableCellLast: {
    paddingRight: 16
  },
  tooltipWrapper: {
    background: Colors.secondary,
    padding: 0,
    width: 14,
    height: 14,
    borderRadius: 2,
    marginLeft: 8,
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    display: 'inline-block'
  },
  tooltipText: {
    fontSize: 13
  }
};

class TableSimpleCell extends Component {
  getCellStyles() {
    const { index, rowLength, actionsExist } = this.props;
    const intIndex = parseInt(index);
    return Object.assign(
      {},
      styles.tableCell,
      intIndex === 0
        ? styles.tableCellFirst
        : intIndex === parseInt(rowLength) - 1 && !actionsExist ? styles.tableCellLast : ''
    );
  }

  renderCell() {
    const { format, numeric, keyCell } = this.props;
    const key = keyCell;
    if (key === '2100-01-01') {
      return <TableCell style={this.getCellStyles()}>-</TableCell>;
    } else if (typeof key === 'string' || typeof key === 'number') {
      if (/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/i.test(keyCell)) {
        return (
          <TableCell style={this.getCellStyles()} numeric={numeric}>
            {key.substring(8, 10) +
            '-' +
            key.substring(5, 7) +
            '-' +
            key.substring(0, 4)}
          </TableCell>
        );
      } else if (key.length > 27) {
        return (
          <TableCell style={this.getCellStyles()} numeric={numeric}>
            <div className="flex-wrap">
              <div>{key.slice(0, 24) + '...' + (format ? format : '')}</div>
              <div className="align-center-full" style={styles.tooltipWrapper}>
                <Tooltip title={<div style={styles.tooltipText}>{key + (format ? format : '')}</div>} placement="top">

                </Tooltip>
              </div>
            </div>
          </TableCell>
        );
      } else {
        return (
          <TableCell style={this.getCellStyles()} numeric={numeric}>
            {key + (format ? format : '')}
          </TableCell>
        );
      }
    } else if (typeof key === 'boolean') {
      return (
        <TableCell style={this.getCellStyles()} className="text-center">
          <Checkbox checked={key} disabled={true} />
        </TableCell>
      );
    } else if (typeof key === 'object') {
      if (!key) {
        return (
          <TableCell style={this.getCellStyles()} className="text-center">
            <span />
          </TableCell>
        );
      }
      if (!key.manageable) {
        return (
          <TableCell style={this.getCellStyles()} className="text-center">
            <Checkbox checked={key.value} disabled={true} />
          </TableCell>
        );
      }
      if (Array.isArray(key)) {
        if (key.length === 0) {
          return (
            <TableCell style={this.getCellStyles()} className="text-center">
              <span>-</span>
            </TableCell>
          );
        } else {
          return (
            <TableCell style={this.getCellStyles()} className="text-center">
              <span />
            </TableCell>
          );
        }
      }
    }
    return (
      <TableCell style={this.getCellStyles()} className="text-center">
        <span />
      </TableCell>
    );
  }

  render() {
    return <Fragment>{this.renderCell()}</Fragment>;
  }
}

export default TableSimpleCell;

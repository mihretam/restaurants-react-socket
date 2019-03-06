import React, { Component } from 'react'
import {
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from '@material-ui/core'

import TableSimpleCell from './TableSimpleCell'
import styles from './styles'
import Dimensions from '../../../utils/Dimensions'

export class TableSimple extends Component {
  state = {
    dialogCellOpen: false,
    dialogCellHeader: [],
    dialogCellData: {},
    tablePage: 0,
    rowsPerPage: 10
  }

  handleChangePage = (event, page) => {
    const {tablePage} = this.state
    if (tablePage !== page) {
      this.setState({tablePage: page})
    }
  }

  renderTitle () {
    const {title} = this.props
    if (title) {
      return (
        <div className='padding-vertical-half' style={styles.tableTitle}>
          <span>{title}</span>
        </div>
      )
    }
  }

  renderTableHeader () {
    const tableHeaderData =
      this.props.manager && !this.props.permaData
        ? this.props.header.concat({name: ' ', center: true})
        : this.props.header
    if (this.props.data && this.props.data.length !== 0) {
      return tableHeaderData.map((header, i) => (
        <TableCell
          key={header.name || header}
          style={Object.assign(
            {},
            styles.tableCell,
            styles.headerCell,
            i === 0
              ? styles.tableCellFirst
              : i === tableHeaderData.length - 1 ? styles.tableCellLast : ''
          )}
          className={header.center ? 'text-center' : ''}
          numeric={header.numeric}
        >
          {header.name || header}
        </TableCell>
      ))
    } else {
      return (
        <TableCell
          style={Object.assign({}, styles.headerCell)}
          className='text-center'
        >
          Empty
        </TableCell>
      )
    }
  }

  renderTableBody () {
    const {tablePage, rowsPerPage} = this.state
    const {data} = this.props

    if (data) {
      return (
        <TableBody>
          {data
          .slice(tablePage * rowsPerPage, tablePage * rowsPerPage + rowsPerPage)
          .map((item, i) => {
            return (
              <TableRow key={i}>
                {this.renderData(item, i)}
              </TableRow>
            )
          })}
        </TableBody>
      )
    }
  }

  renderTableFooter () {
    const {tablePage, rowsPerPage} = this.state
    const {data} = this.props
    if (this.props.data && this.props.data.length > rowsPerPage) {
      return (
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={12}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={tablePage}
              onChangePage={this.handleChangePage}
              rowsPerPageOptions={[rowsPerPage]}
            />
          </TableRow>
        </TableFooter>
      )
    }
  }

  renderData (item, i) {
    const {fields} = this.props
    if (fields) {
      return Object.keys(fields).map((ix, i) => {
        if (typeof fields[ix] === 'object') {
          return this.renderTableCell(
            i,
            item[fields[ix].name],
            fields[ix],
            Object.keys(fields).length
          )
        } else {
          return this.renderTableCell(
            i,
            item[this.props.fields[ix]],
            null,
            Object.keys(fields).length
          )
        }
      })
    }
    return Object.keys(item).map((ix, i) => {
      return this.renderTableCell(i, item[ix], null, Object.keys(item).length)
    })
  }

  renderTableCell (ix, keyCell, field, rowLength) {
    // Inputs: Position of the cell, data object key
    // Action: Renders individual table cells
    const {manager, permaData} = this.props

    return (
      <TableSimpleCell
        key={ix}
        index={ix}
        keyCell={keyCell}
        format={field ? field.format : null}
        numeric={field ? field.numeric : null}
        rowLength={rowLength}
        actionsExist={manager && !permaData}
      />
    )
  }

  render () {
    const {title, width, flexWidth, size} = this.props
    return (
      <Grid
        item
        xs={size[0]}
        sm={size[1]}
        md={size[2]}
        lg={size[3] || size[2]}
        style={styles.paddingFullStandard}>
        <Card style={Object.assign({}, width < Dimensions.phone && !flexWidth ? styles.tableWrapper : '')}>
          {this.renderTitle()}
          <Table data-id={'table-simple/' + title}>
            <TableHead>
              <TableRow style={styles.tableHeaderRow}>
                {this.renderTableHeader()}
              </TableRow>
            </TableHead>
            {this.renderTableBody()}
            {this.renderTableFooter()}
          </Table>
        </Card>
      </Grid>
    )
  }
}

export default TableSimple

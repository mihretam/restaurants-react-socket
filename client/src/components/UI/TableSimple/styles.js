import Colors from '../../../utils/Colors';
import Dimensions from '../../../utils/Dimensions';
import RootContainerStyles from '../../Styles/RootComponentStyles';

const styles = {
  ...RootContainerStyles,
  tableWrapper: {
    minWidth: 1500,
    overflow: 'scroll'
  },
  tableTitle: {
    minHeight: 32,
    color: Colors.white,
    fontWeight: '400',
    fontSize: Dimensions.textMedium,
    textAlign: 'center',
    width: '100%',
    background: Colors.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    paddingLeft:'50px'
  },
  tableHeaderRow: {
    height: 42,
    background: Colors.secondaryLight4
  },
  tableCell: {
    padding: '0px 0px 0px 16px'
  },
  tableCellFirst: {
    paddingLeft: 16
  },
  tableCellLast: {
    paddingRight: 16
  },
  tableIconWrapper: {
    flex: 1,
    display: 'flex',
    padding: 0,
    paddingLeft: 16,
    margin: 0
  },
  tableIcon: {
    width: 32,
    height: 32
  },
  createButtonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: 16
  },
  headerCell: {
    background: Colors.color3,
    fontWeight: 'bold'
  },
  actionCell: {
    width: 12
  },
  actionButton: {
    minWidth: 16,
    padding: 0
  },
  actionName: {
    fontSize: 14
  }
};

export default styles;

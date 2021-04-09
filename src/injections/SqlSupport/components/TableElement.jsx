import React, { DragEvent } from 'react';
import PropTypes from 'prop-types';
import { Card as Well } from 'react-bootstrap';
import Collapse from 'src/common/components/Collapse';
import ButtonGroup from 'src/components/ButtonGroup';
import shortid from 'shortid';
import { t, styled } from '@superset-ui/core';
import { debounce } from 'lodash';

import Fade from 'src/common/components/Fade';
import { Tooltip } from 'src/common/components/Tooltip';
import CopyToClipboard from '../../../components/CopyToClipboard';
import { IconTooltip } from '../../../components/IconTooltip';
import ColumnElement from './ColumnElement';
import ShowSQL from './ShowSQL';
import ModalTrigger from '../../../components/ModalTrigger';
import Loading from '../../../components/Loading';

const propTypes = {
  table: PropTypes.object,
  actions: PropTypes.object,
};

const defaultProps = {
  actions: {},
  table: null,
};

const StyledSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary.dark1};
  &: hover {
    color: ${({ theme }) => theme.colors.primary.dark2};
  }
  cursor: pointer;
`;

class TableElement extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortColumns: false,
      hovered: false,
    };
    this.toggleSortColumns = this.toggleSortColumns.bind(this);
    this.removeTable = this.removeTable.bind(this);
    this.setHover = debounce(this.setHover.bind(this), 100);


  }
  onDragStart = (event, node) => {
    event.stopPropagation();
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  setHover(hovered) {
    this.setState({ hovered });
  }

  popSelectStar() {
    const qe = {
      id: shortid.generate(),
      title: this.props.table.name,
      dbId: this.props.table.dbId,
      autorun: true,
      sql: this.props.table.selectStar,
    };
    this.props.actions.addQueryEditor(qe);
  }

  toggleTable(e) {
    e.preventDefault();
    if (this.props.table.expanded) {
      this.props.actions.collapseTable(this.props.table);
    } else {
      this.props.actions.expandTable(this.props.table);
    }
  }

  removeTable() {
    this.props.actions.removeDataPreview(this.props.table);
    this.props.actions.removeTable(this.props.table);
  }

  toggleSortColumns() {
    this.setState(prevState => ({ sortColumns: !prevState.sortColumns }));
  }

  renderWell() {
    const { table } = this.props;
    let header;
    if (table.partitions) {
      let partitionQuery;
      let partitionClipBoard;
      if (table.partitions.partitionQuery) {
        ({ partitionQuery } = table.partitions.partitionQuery);
        const tt = t('Copy partition query to clipboard');
        partitionClipBoard = (
          <CopyToClipboard
            text={partitionQuery}
            shouldShowText={false}
            tooltipText={tt}
            copyNode={<i className="fa fa-clipboard" />}
          />
        );
      }
      let latest = Object.entries(table.partitions?.latest || []).map(
        ([key, value]) => `${key}=${value}`,
      );
      latest = latest.join('/');
      header = (
        <Well bsSize="small">
          <div>
            <small>
              {t('latest partition:')} {latest}
            </small>{' '}
            {partitionClipBoard}
          </div>
        </Well>
      );
    }
    return header;
  }

  renderControls() {
    let keyLink;
    const { table } = this.props;
    if (table.indexes && table.indexes.length > 0) {
      keyLink = (
        <ModalTrigger
          modalTitle={
            <div>
              {t('Keys for table')} <strong>{table.name}</strong>
            </div>
          }
          modalBody={table.indexes.map((ix, i) => (
            <pre key={i}>{JSON.stringify(ix, null, '  ')}</pre>
          ))}
          triggerNode={
            <IconTooltip
              className="fa fa-key pull-left m-l-2"
              tooltip={t('View keys & indexes (%s)', table.indexes.length)}
            />
          }
        />
      );
    }
    return (
      <ButtonGroup className="ws-el-controls">
        {keyLink}
        <IconTooltip
          className={
            `fa fa-sort-${!this.state.sortColumns ? 'alpha' : 'numeric'}-asc ` +
            'pull-left sort-cols m-l-2 pointer'
          }
          onClick={this.toggleSortColumns}
          tooltip={
            !this.state.sortColumns
              ? t('Sort columns alphabetically')
              : t('Original table column order')
          }
        />
        {
          table.selectStar && (
            <CopyToClipboard
              copyNode={
                <IconTooltip aria-label="Copy">
                  <i aria-hidden className="fa fa-clipboard pull-left m-l-2" />
                </IconTooltip>
              }
              text={table.selectStar}
              shouldShowText={false}
              tooltipText={t('Copy SELECT statement to the clipboard')}
            />
          )
        }
        {
          table.view && (
            <ShowSQL
              sql={table.view}
              tooltipText={t('Show CREATE VIEW statement')}
              title={t('CREATE VIEW statement')}
            />
          )
        }
        <IconTooltip
          className="fa fa-times table-remove pull-left m-l-2 pointer"
          onClick={this.removeTable}
          tooltip={t('Remove table preview')}
        />
      </ButtonGroup>
    );
  }

  renderHeader() {
    const { table } = this.props;
    return (
      <div
        className="clearfix header-container"
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        draggable
        // style={{ background: 'red' }}
        onDragStart={(evt) => this.onDragStart(evt, table)}
      >
        <Tooltip
          id="copy-to-clipboard-tooltip"
          placement="top"
          style={{ cursor: 'pointer' }}
          title={table.name}
          trigger={['hover']}
        >
          <StyledSpan
            data-test="collapse"
            className="table-name"
            onClick={e => {
              this.toggleTable(e);
            }}
          >
            <strong>{table.name}</strong>
          </StyledSpan>
        </Tooltip>

        <div className="pull-right header-right-side">
          {table.isMetadataLoading || table.isExtraMetadataLoading ? (
            <Loading position="inline" />
          ) : (
            <Fade
              hovered={this.state.hovered}
              onClick={e => e.stopPropagation()}
            >
              {this.renderControls()}
            </Fade>
          )}
        </div>
      </div>
    );
  }

  renderBody() {
    const { table } = this.props;
    let cols;
    if (table.columns) {
      cols = table.columns.slice();
      if (this.state.sortColumns) {
        cols.sort((a, b) => {
          const colA = a.name.toUpperCase();
          const colB = b.name.toUpperCase();
          if (colA < colB) {
            return -1;
          }
          if (colA > colB) {
            return 1;
          }
          return 0;
        });
      }
    }

    const metadata = (
      <div
        onMouseEnter={() => this.setHover(true)}
        onMouseLeave={() => this.setHover(false)}
        css={{ paddingTop: 6 }}
      >
        {this.renderWell()}
        <div>
          {cols &&
            cols.map(col => <ColumnElement column={col} key={col.name} />)}
        </div>
      </div>
    );
    return metadata;
  }

  render() {
    const { table } = this.props;
    return (
      <Collapse.Panel
        {...this.props}
        header={this.renderHeader()}
        className="TableElement"

      >
        {
          this.renderBody()
        }
      </Collapse.Panel>

    );
  }
}

TableElement.propTypes = propTypes;
TableElement.defaultProps = defaultProps;

export default TableElement;

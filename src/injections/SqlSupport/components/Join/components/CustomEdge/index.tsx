import React from 'react';
import { getSmoothStepPath, getMarkerEnd, Position, EdgeText } from 'react-flow-renderer';
import { useSelector } from 'react-redux';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
  label,
  arrowHeadType,
  markerEndId,
  labelStyle,
  labelShowBg,
  labelBgStyle,
  labelBgPadding,
  labelBgBorderRadius,
}) => {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition: Position.Left, // optional
    targetX,
    targetY,
    targetPosition: Position.Right, // optional
    borderRadius: 5, // optional
  });

  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
  const selectedNode = useSelector((state: any) => state.element.selectedNode);

  return (
    <>
      <path
        id={id}
        style={style}
        className={selectedNode.id === id ? 'selected-edge' : 'custom-edge'}
        d={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeText
        x={sourceX + 15}
        y={sourceY}
        label={label.split('-')[0]}
        labelStyle={labelStyle}
        labelShowBg={labelShowBg}
        labelBgStyle={labelBgStyle}
        labelBgPadding={labelBgPadding}
        labelBgBorderRadius={labelBgBorderRadius}
      />
      <EdgeText
        x={targetX - 15}
        y={targetY}
        label={label.split('-')[1]}
        labelStyle={labelStyle}
        labelShowBg={labelShowBg}
        labelBgStyle={labelBgStyle}
        labelBgPadding={labelBgPadding}
        labelBgBorderRadius={labelBgBorderRadius}
      />
    </>
  );
};
export default CustomEdge;

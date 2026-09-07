import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Sparkles } from 'lucide-react';

const PALETTE = [
  '#2563EB', '#0EA5E9', '#10B981', '#F59E0B', 
  '#6366F1', '#14B8A6', '#8B5CF6', '#3B82F6'
];

export default function D3GlobalClusterChart({ data = [], isDark = false, onSelectTopic }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    if (!data || data.length === 0 || !svgRef.current) return;

    const width = containerRef.current ? containerRef.current.clientWidth : 600;
    const height = 320;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    const g = svg.append('g');

    const zoom = d3
      .zoom()
      .scaleExtent([0.6, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    const nodes = data.slice(0, 28).map((d, i) => {
      const radius = Math.max(16, Math.min(44, Math.sqrt(d.count || 1) * 7 + (d.avgIntensity || 0) * 0.7));
      return {
        id: d.topic || `topic-${i}`,
        name: d.topic || 'General',
        count: d.count || 1,
        avgIntensity: d.avgIntensity || 5,
        radius,
        color: PALETTE[i % PALETTE.length],
        x: width / 2 + (Math.random() - 0.5) * 140,
        y: height / 2 + (Math.random() - 0.5) * 140
      };
    });

    const simulation = d3
      .forceSimulation(nodes)
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force('charge', d3.forceManyBody().strength((d) => -d.radius * 2.5))
      .force('collision', d3.forceCollide().radius((d) => d.radius + 2).iterations(2))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    const nodeGroup = g
      .selectAll('.bubble-node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'bubble-node')
      .style('cursor', 'pointer')
      .on('mouseenter', (event, d) => {
        setHoveredNode(d);
        d3.select(event.currentTarget)
          .select('circle')
          .transition()
          .duration(120)
          .attr('transform', 'scale(1.08)');
      })
      .on('mouseleave', (event) => {
        setHoveredNode(null);
        d3.select(event.currentTarget)
          .select('circle')
          .transition()
          .duration(120)
          .attr('transform', 'scale(1)');
      })
      .on('click', (event, d) => {
        if (onSelectTopic) onSelectTopic(d.name);
      });

    nodeGroup
      .append('circle')
      .attr('r', (d) => d.radius)
      .attr('fill', (d) => d.color)
      .attr('fill-opacity', 0.85)
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 1.5);

    nodeGroup
      .append('text')
      .text((d) => (d.radius > 20 ? (d.name.length > 9 ? d.name.slice(0, 8) + '..' : d.name) : ''))
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', '#ffffff')
      .attr('font-size', (d) => Math.min(11, d.radius / 2.7))
      .attr('font-weight', '700')
      .attr('font-family', "'Plus Jakarta Sans', sans-serif")
      .attr('pointer-events', 'none');

    simulation.on('tick', () => {
      nodeGroup.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    const drag = d3
      .drag()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    nodeGroup.call(drag);

    return () => {
      simulation.stop();
    };
  }, [data, isDark, onSelectTopic]);

  return (
    <div className="card-panel p-5 flex flex-col h-full" ref={containerRef}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[var(--text-heading)]">
              D3.js Topic Force Cluster
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Drag, zoom, or click bubbles to filter
            </p>
          </div>
        </div>
        <span className="badge badge-primary text-[10px]">D3.js Engine</span>
      </div>

      <div className="relative flex-1 min-h-[260px] bg-[var(--bg-subtle)] rounded-lg border border-[var(--border-color)] overflow-hidden flex items-center justify-center">
        <svg ref={svgRef} className="w-full h-full" />

        {hoveredNode && (
          <div className="absolute top-3 left-3 bg-[var(--bg-surface-glass)] backdrop-blur-md border border-[var(--border-color)] px-3 py-1.5 rounded-lg shadow-sm text-xs pointer-events-none animate-fade-in">
            <p className="font-bold text-[var(--text-heading)] flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: hoveredNode.color }}
              ></span>
              {hoveredNode.name}
            </p>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5 space-y-0.5">
              <p>Insights: <strong className="text-[var(--text-heading)]">{hoveredNode.count}</strong></p>
              <p>Avg Intensity: <strong className="text-[#2563EB]">{hoveredNode.avgIntensity}</strong></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

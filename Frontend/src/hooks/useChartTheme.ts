import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

function readCssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

export function useChartTheme() {
  const mode = useSelector((state: RootState) => state.theme.mode)

  return useMemo(() => {
    const axis = readCssVar('--color-chart-axis', '#474651')
    const tooltipBg = readCssVar('--color-chart-tooltip-bg', '#ffffff')
    const tooltipText = readCssVar('--color-chart-tooltip-text', '#191c1d')
    const tooltipBorder = readCssVar('--color-chart-tooltip-border', '#c8c5d3')

    return {
      grid: readCssVar('--color-chart-grid', '#e1e3e4'),
      axis,
      tooltip: {
        backgroundColor: tooltipBg,
        border: `1px solid ${tooltipBorder}`,
        borderRadius: '8px',
        color: tooltipText,
        fontSize: '12px',
      },
      legend: { color: axis },
      tick: { fontSize: 12, fill: axis },
      statusColors: {
        pending: readCssVar('--color-chart-pending', '#de915e'),
        'in-progress': readCssVar('--color-chart-in-progress', '#4648d4'),
        completed: readCssVar('--color-chart-completed', '#1a146b'),
      },
      projectColors: [
        readCssVar('--color-chart-1', '#4648d4'),
        readCssVar('--color-chart-2', '#1a146b'),
        readCssVar('--color-chart-3', '#c3c0ff'),
        readCssVar('--color-chart-4', '#de915e'),
      ],
      barFill: readCssVar('--color-chart-bar', '#4648d4'),
    }
  }, [mode])
}

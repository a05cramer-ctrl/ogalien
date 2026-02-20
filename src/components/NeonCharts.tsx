export function NeonCharts() {
  return (
    <div className="neon-charts" aria-hidden>
      <svg className="chart-lines" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(138, 43, 226, 0.6)" />
            <stop offset="50%" stopColor="rgba(0, 255, 136, 0.5)" />
            <stop offset="100%" stopColor="rgba(100, 149, 237, 0.6)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M0,150 Q50,120 100,100 T200,80 T300,60 T400,40"
          fill="none"
          stroke="url(#chartGrad)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
        <path
          d="M0,180 Q80,140 150,120 T280,90 T400,70"
          fill="none"
          stroke="rgba(100, 255, 180, 0.3)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M0,100 Q100,80 200,100 T400,90"
          fill="none"
          stroke="rgba(138, 43, 226, 0.25)"
          strokeWidth="1"
        />
      </svg>
      <svg className="chart-lines chart-lines-2" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path
          d="M0,50 Q100,80 200,60 T400,40"
          fill="none"
          stroke="rgba(100, 255, 180, 0.2)"
          strokeWidth="1"
        />
        <path
          d="M0,120 Q150,90 300,110 T400,100"
          fill="none"
          stroke="rgba(138, 43, 226, 0.2)"
          strokeWidth="1"
          strokeDasharray="8 4"
        />
      </svg>
    </div>
  )
}

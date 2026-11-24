export default function ProjectArtwork({ type }) {

  // KRISHIAI — BOTANICAL INTELLIGENCE

  if (type === 'krishi') {
    return (
      <div className="project-artwork" aria-hidden="true">
        <svg viewBox="0 0 360 320" fill="none">

          <circle
            cx="180" cy="160" r="125"
            stroke="currentColor" opacity=".12"
          />

          <circle
            cx="180" cy="160" r="105"
            stroke="currentColor"
            strokeDasharray="4 8"
            opacity=".3"
          />

          <path
            d="M75 250 C35 100 160 45 295 45
               C290 185 220 290 75 250Z"
            fill="currentColor"
            fillOpacity=".08"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M60 275 Q160 155 280 60"
            stroke="currentColor"
            strokeWidth="2"
          />

          {Array.from({ length: 7 }, (_, i) => (
            <g key={i}>
              <path
                d={`M${100 + i * 23} ${230 - i * 24}
                    Q${65 + i * 19} ${165 - i * 13}
                    ${95 + i * 25} ${95 - i * 6}`}
                stroke="currentColor"
                opacity=".55"
              />

              <path
                d={`M${100 + i * 23} ${230 - i * 24}
                    Q${160 + i * 20} ${245 - i * 18}
                    ${190 + i * 14} ${230 - i * 21}`}
                stroke="currentColor"
                opacity=".55"
              />

              <circle
                cx={100 + i * 23}
                cy={230 - i * 24}
                r="3"
                fill="currentColor"
              />
            </g>
          ))}

          <path
            d="M40 85 V40 H85
               M275 40 H320 V85
               M40 235 V280 H85
               M275 280 H320 V235"
            stroke="currentColor"
            strokeWidth="2"
            opacity=".8"
          />

          <text
            x="40" y="305"
            fill="currentColor"
            fontSize="9"
            letterSpacing="3"
          >
            BOTANICAL ANALYSIS
          </text>

        </svg>
      </div>
    )
  }


  // CKD ONE — MEDICAL DATA INTERFACE

  if (type === 'ckd') {
    return (
      <div className="project-artwork" aria-hidden="true">
        <svg viewBox="0 0 360 320" fill="none">

          {[45, 90, 135, 180, 225, 270].map(y => (
            <path
              key={y}
              d={`M10 ${y} H350`}
              stroke="currentColor"
              opacity=".12"
            />
          ))}

          {[45, 90, 135, 180, 225, 270, 315].map(x => (
            <path
              key={x}
              d={`M${x} 10 V310`}
              stroke="currentColor"
              opacity=".12"
            />
          ))}

          <circle
            cx="180" cy="150" r="105"
            stroke="currentColor"
            opacity=".3"
          />

          <circle
            cx="180" cy="150" r="88"
            stroke="currentColor"
            strokeDasharray="5 10"
            opacity=".5"
          />

          {/* Stylized kidney illustration */}

          <path
            d="M150 70
               C95 35 55 100 78 165
               C90 210 145 235 158 193
               C173 165 130 150 139 130
               C175 105 180 85 150 70Z"
            fill="currentColor"
            fillOpacity=".15"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M210 70
               C265 35 305 100 282 165
               C270 210 215 235 202 193
               C187 165 230 150 221 130
               C185 105 180 85 210 70Z"
            fill="currentColor"
            fillOpacity=".15"
            stroke="currentColor"
            strokeWidth="2"
          />

          <path
            d="M10 255 H65 L80 240 L95 265
               L115 210 L135 285 L155 250
               H205 L220 230 L235 255 H350"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          <text
            x="20" y="305"
            fill="currentColor"
            fontSize="9"
            letterSpacing="3"
          >
            EXPLAINABLE ML SYSTEM
          </text>

        </svg>
      </div>
    )
  }


  // SMARTROSTER — OPTIMIZATION GRID

  if (type === 'roster') {
    return (
      <div className="project-artwork" aria-hidden="true">
        <svg viewBox="0 0 360 320" fill="none">

          <rect
            x="15" y="35" width="330" height="245"
            rx="10"
            fill="currentColor"
            fillOpacity=".025"
            stroke="currentColor"
            strokeOpacity=".35"
          />

          <text
            x="32" y="60"
            fill="currentColor"
            fontSize="10"
            letterSpacing="2"
          >
            ROSTER / VISUALIZATION
          </text>

          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(
            (day, i) => (
              <text
                key={i}
                x={46 + i * 42}
                y="90"
                textAnchor="middle"
                fill="currentColor"
                fontSize="10"
                opacity=".7"
              >
                {day}
              </text>
            )
          )}

          {Array.from({ length: 35 }, (_, i) => {
            const x = 30 + (i % 7) * 42
            const y = 105 + Math.floor(i / 7) * 29

            const opacity = [
              .12, .65, .3, .85, .45
            ][(i * 7 + Math.floor(i / 3)) % 5]

            return (
              <rect
                key={i}
                x={x}
                y={y}
                width="33"
                height="21"
                rx="3"
                fill="currentColor"
                fillOpacity={opacity}
                stroke="currentColor"
                strokeOpacity=".15"
              />
            )
          })}

          <circle
            cx="35" cy="260" r="3"
            fill="currentColor"
          />

          <text
            x="46" y="263"
            fill="currentColor"
            fontSize="9"
            letterSpacing="2"
          >
            CONSTRAINT OPTIMIZATION
          </text>

        </svg>
      </div>
    )
  }


  // SCHOOL MANAGEMENT — DIGITAL LEARNING

  return (
    <div className="project-artwork" aria-hidden="true">
      <svg viewBox="0 0 360 320" fill="none">

        <rect
          x="20" y="30" width="320" height="255"
          rx="9"
          fill="currentColor"
          fillOpacity=".025"
          stroke="currentColor"
          strokeOpacity=".5"
        />

        <path
          d="M20 65 H340"
          stroke="currentColor"
          opacity=".25"
        />

        {[35, 48, 61].map(x => (
          <circle
            key={x}
            cx={x}
            cy="47"
            r="3"
            fill="currentColor"
            opacity=".7"
          />
        ))}

        <rect
          x="30" y="75" width="70" height="200"
          rx="4"
          fill="currentColor"
          fillOpacity=".1"
        />

        {[95, 120, 145, 170, 195].map(y => (
          <rect
            key={y}
            x="40" y={y}
            width="45" height="5"
            rx="2"
            fill="currentColor"
            opacity=".3"
          />
        ))}

        {[0, 1, 2].map(i => (
          <g key={i}>
            <rect
              x={112 + i * 73}
              y="78"
              width="64"
              height="50"
              rx="4"
              fill="currentColor"
              fillOpacity=".12"
              stroke="currentColor"
              strokeOpacity=".25"
            />

            <rect
              x={120 + i * 73}
              y="90"
              width="28"
              height="5"
              rx="2"
              fill="currentColor"
              opacity=".5"
            />

            <rect
              x={120 + i * 73}
              y="105"
              width="38"
              height="9"
              rx="2"
              fill="currentColor"
              opacity=".7"
            />
          </g>
        ))}

        <rect
          x="112" y="140" width="210" height="125"
          rx="5"
          stroke="currentColor"
          strokeOpacity=".25"
        />

        {[35, 60, 40, 85, 65, 95, 75].map(
          (height, i) => (
            <rect
              key={i}
              x={125 + i * 27}
              y={245 - height}
              width="16"
              height={height}
              rx="3"
              fill="currentColor"
              opacity={.3 + i * .08}
            />
          )
        )}

        <text
          x="25" y="307"
          fill="currentColor"
          fontSize="9"
          letterSpacing="3"
        >
          INTELLIGENT LEARNING SYSTEM
        </text>

      </svg>
    </div>
  )
}
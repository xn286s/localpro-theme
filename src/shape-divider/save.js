import { useBlockProps } from '@wordpress/block-editor';

function generatePath(shape, offset, width, height) {
    const w = width;
    const h = height;
    const o = (offset / 100) * w;

    switch (shape) {
        case 'wave': {
            const cp1x = o * 0.5;
            const cp2x = o;
            const cp3x = o + (w - o) * 0.5;
            return `M0 ${h} L0 ${h * 0.4} Q${cp1x} 0 ${cp2x} ${h * 0.5} Q${cp3x} ${h} ${w} ${h * 0.3} L${w} ${h} Z`;
        }
        case 'curve': {
            return `M0 ${h} L0 ${h * 0.6} Q${o} ${-h * 0.2} ${w} ${h * 0.6} L${w} ${h} Z`;
        }
        case 'slant': {
            const slantY = (offset / 100) * h;
            return `M0 ${h} L0 ${slantY} L${w} ${h - slantY} L${w} ${h} Z`;
        }
        case 'triangle': {
            return `M0 ${h} L${o} 0 L${w} ${h} Z`;
        }
        case 'arrow': {
            const arrowW = w * 0.08;
            return `M0 ${h} L${o - arrowW} ${h} L${o} 0 L${o + arrowW} ${h} L${w} ${h} L${o} ${h * 0.35} Z`;
        }
        case 'zigzag': {
            const segments = 12;
            const segW = w / segments;
            const amplitude = h * 0.7;
            const baseY = h;
            const startOffset = ((offset - 50) / 100) * segW;
            let d = `M0 ${baseY}`;
            for (let i = 0; i <= segments; i++) {
                const x = i * segW + startOffset;
                const y = i % 2 === 0 ? baseY - amplitude : baseY;
                d += ` L${Math.max(0, Math.min(w, x))} ${y}`;
            }
            d += ` L${w} ${baseY} Z`;
            return d;
        }
        case 'tilt': {
            const tiltH = (offset / 100) * h * 0.9;
            return `M0 ${h} L0 ${tiltH} L${w} ${h - tiltH} L${w} ${h} Z`;
        }
        case 'mountains': {
            const p1 = o * 0.4;
            const p2 = o * 0.8;
            const p3 = o;
            const p4 = o + (w - o) * 0.3;
            const p5 = o + (w - o) * 0.65;
            return `M0 ${h} L0 ${h * 0.7} L${p1} ${h * 0.3} L${p2} ${h * 0.55} L${p3} ${h * 0.1} L${p4} ${h * 0.5} L${p5} ${h * 0.25} L${w} ${h * 0.6} L${w} ${h} Z`;
        }
        default:
            return `M0 ${h} L0 0 Q${o} ${h} ${w} 0 L${w} ${h} Z`;
    }
}

export default function save({ attributes }) {
    const { shape, offset, height, flip } = attributes;


    const blockProps = useBlockProps.save({
        ...useBlockProps.style,
        className: 'shape-divider',
    });

    const path = generatePath(shape, offset, 1200, 100);

    const svgStyle = {
        display: 'block',
        width: '100%',
        height: `${height}px`,
        transform: flip ? 'scaleY(-1)' : 'none',
    };

    return (
        <div {...blockProps}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
                style={svgStyle}
                aria-hidden="true"
            >
                <path d={path} fill={'currentColor'} />
            </svg>
        </div>
    );
}

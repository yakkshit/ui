"use client"

import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader'

const vertexShader = `
  attribute float size;
  attribute vec3 color;
  varying vec3 vColor;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`

interface CountryMapProps {
  countryCode: string;
}

const CountryMap: React.FC<CountryMapProps> = ({ countryCode }) => {
  const [points, setPoints] = useState<THREE.Vector3[]>([])
  const [sizes, setSizes] = useState<number[]>([])
  const [colors, setColors] = useState<THREE.Color[]>([])
  const groupRef = useRef<THREE.Group>(null)

  useEffect(() => {
    const loader = new SVGLoader()
    const svgUrl = `https://raw.githubusercontent.com/djaiss/mapsicon/33ba28808f8d32b5bae0ffada9cadd07073852e1/all/${countryCode}/vector.svg`

    loader.load(svgUrl, (data) => {
      const newPoints: THREE.Vector3[] = []
      const newSizes: number[] = []
      const newColors: THREE.Color[] = []

      data.paths.forEach((path) => {
        const points = path.subPaths.flatMap(subPath => 
          subPath.getPoints().map(point => new THREE.Vector3(point.x, -point.y, 0))
        )
        newPoints.push(...points)

        const pathSizes = points.map(() => Math.random() * 0.03 + 0.01)
        newSizes.push(...pathSizes)

        const pathColors = points.map(() => new THREE.Color(0xFFFFFF).multiplyScalar(Math.random() * 0.5 + 0.5))
        newColors.push(...pathColors)
      })

      // Center and scale the points
      const box = new THREE.Box3().setFromPoints(newPoints)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y)
      const scale = 4 / maxDim

      newPoints.forEach(point => {
        point.sub(center).multiplyScalar(scale)
      })

      setPoints(newPoints)
      setSizes(newSizes)
      setColors(newColors)
    })
  }, [countryCode])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1))
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors.flatMap(c => [c.r, c.g, c.b]), 3))
    return geo
  }, [points, sizes, colors])

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(0x4a80f5) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} />
    </group>
  )
}

const StarField = () => {
  const starsRef = useRef<THREE.Points>(null)
  const [starPositions] = useState(() => {
    const positions = new Float32Array(3000)
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  })

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="position"
          count={starPositions.length / 3}
          array={starPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.01} color={0xffffff} sizeAttenuation={true} />
    </points>
  )
}

export default function CountryBackground() {
  const [countryCode, setCountryCode] = useState<string>('se')

  useEffect(() => {
    // In a real application, you would use a geolocation service here
    // For demonstration purposes, we'll just set a random country
    const countries = ['in', 'us', 'jp', 'br', 'ru']
    const randomCountry = countries[Math.floor(Math.random() * countries.length)]
    setCountryCode(randomCountry)
  }, [])

  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <StarField />
        <CountryMap countryCode={countryCode} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
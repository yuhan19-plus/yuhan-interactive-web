import { Text3D } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { Bricks0 } from './miniObject/Bricks0';
import { Bricks1024 } from './miniObject/Bricks1024';
import { Bricks128 } from './miniObject/Bricks128';
import { Bricks16 } from './miniObject/Bricks16';
import { Bricks2 } from './miniObject/Bricks2';
import { Bricks2048 } from './miniObject/Bricks2048';
import { Bricks256 } from './miniObject/Bricks256';
import { Bricks32 } from './miniObject/Bricks32';
import { Bricks4 } from './miniObject/Bricks4';
import { Bricks512 } from './miniObject/Bricks512';
import { Bricks64 } from './miniObject/Bricks64';
import { Bricks8 } from './miniObject/Bricks8';
import { FONT_URL } from '../../../../../../data/commonData';
import { motion } from 'framer-motion-3d'

const initialBoard = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];

function MiniGame2048({ position, rotation, scale }) {
  const [board, setBoard] = useState(initialBoard);
  const [moved, setMoved] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameClear, setGameClear] = useState(false); // 게임 클리어 상태 추가

  useEffect(() => {
    resetGame(); // 초기 게임 시작 시 랜덤 타일 추가
  }, []);

  const addRandomTile = (currentBoard) => {
    const emptyTiles = [];
    currentBoard.forEach((row, rowIndex) =>
      row.forEach((tile, colIndex) => {
        if (tile === 0) emptyTiles.push({ rowIndex, colIndex });
      })
    );

    if (emptyTiles.length > 0) {
      const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      currentBoard[randomTile.rowIndex][randomTile.colIndex] = Math.random() < 0.9 ? 2 : 4;
    }

    return currentBoard;
  };

  const slide = (arr) => {
    const newRow = arr.filter(num => num !== 0);
    const mergedRow = [];
    let skip = false;

    for (let i = 0; i < newRow.length; i++) {
      if (skip) {
        skip = false;
        continue;
      }
      if (i < newRow.length - 1 && newRow[i] === newRow[i + 1]) {
        const mergedValue = newRow[i] * 2;
        mergedRow.push(mergedValue);
        if (mergedValue === 2048) {
          setGameClear(true); 
        }
        skip = true;
      } else {
        mergedRow.push(newRow[i]);
      }
    }
    return [...mergedRow, ...new Array(4 - mergedRow.length).fill(0)];
  };

  const slideDown = () => {
    const newBoard = board.map(row => slide(row));
    if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
      setMoved(true);
      setBoard(newBoard);
    }
  };

  const slideUp = () => {
    const reversedBoard = board.map(row => slide(row.reverse()).reverse());
    if (JSON.stringify(reversedBoard) !== JSON.stringify(board)) {
      setMoved(true);
      setBoard(reversedBoard);
    }
  };

  const slideLeft = () => {
    const transposedBoard = transpose(board);
    const newBoard = transposedBoard.map(row => slide(row));
    const revertedBoard = transpose(newBoard);
    if (JSON.stringify(revertedBoard) !== JSON.stringify(board)) {
      setMoved(true);
      setBoard(revertedBoard);
    }
  };

  const slideRight = () => {
    const transposedBoard = transpose(board);
    const newBoard = transposedBoard.map(row => slide(row.reverse()).reverse());
    const revertedBoard = transpose(newBoard);
    if (JSON.stringify(revertedBoard) !== JSON.stringify(board)) {
      setMoved(true);
      setBoard(revertedBoard);
    }
  };

  const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));

  const handleKeyDown = (e) => {
    if (gameOver || gameClear) return; // 게임 오버 또는 클리어 상태일 때 키 입력 방지

    switch (e.key) {
      case 'ArrowLeft':
        console.log('좌')
        slideLeft();
        break;
      case 'ArrowRight':
        console.log('우')
        slideRight();
        break;
      case 'ArrowUp':
        console.log('위')
        slideUp();
        break;
      case 'ArrowDown':
        console.log('아래')
        slideDown();
        break;
      default:
        return;
    }
  };

  const isGameOver = () => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) return false;
        if (col < 3 && board[row][col] === board[row][col + 1]) return false;
        if (row < 3 && board[row][col] === board[row + 1][col]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, gameOver, gameClear]);

  useEffect(() => {
    if (moved) {
      setBoard((prevBoard) => {
        const newBoard = addRandomTile([...prevBoard]);
        if (isGameOver()) {
          setGameOver(true); 
        }
        return newBoard;
      });
      setMoved(false);
    }
  }, [moved]);

  const resetGame = () => {
    const newBoard = initialBoard.map(row => row.slice()); 
    const boardWithFirstTile = addRandomTile(newBoard); 
    const boardWithSecondTile = addRandomTile(boardWithFirstTile); 
    setBoard(boardWithSecondTile); 
    setGameOver(false);
    setGameClear(false); 
  };

  const handleResetClick = () => {
    console.log('reset')
    resetGame(); 
  };

  return (
    <>
      <group position={position} rotation={rotation} scale={scale}>
          <group position={[195, -6.5, 190]} scale={[8, 8, 8]} rotation={[Math.PI / -2, 0, Math.PI]}>
            {board.map((row, rowIndex) =>
              row.map((tile, colIndex) => (
                <Tile
                  key={`${rowIndex}-${colIndex}`}
                  value={tile}
                  position={[colIndex * -2.1, rowIndex * 2.1, (rowIndex + colIndex) * 0.3]}
                />
              ))
            )}
        </group>
        {gameOver && (
          <motion.group
            position={[160, -10, 165]}
            animate={{
              y: [-15, -10],
            }}
            transition={{
              delay: 0.1,
              duration: 1,
              ease: 'easeIn'
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleResetClick()
            }}
          >
            <mesh>
              <boxGeometry args={[20, 5, 30]} />
              <meshStandardMaterial color={'#00FF00'} />
            </mesh>
            <group position={[3, 2.3, -8.5]} rotation={[0, 0, -Math.PI / 2]}>
                <Text3D
                  scale={scale}
                  rotation={[0, -Math.PI / 2, 0]}
                  font={FONT_URL}
                >
                  Game Over
                  <meshStandardMaterial color="#FF0000" />
                </Text3D>
                <Text3D 
                  position-y={-7}
                  scale={scale}
                  rotation={[0, -Math.PI / 2, 0]}
                  font={FONT_URL}
                >
                  -다시하기-
                  <meshStandardMaterial color="#0000FF" />
                </Text3D>
              </group>
          </motion.group>
        )}
        {gameClear && (
          <group position={[160, -10, 165]}>
            <mesh>
              <boxGeometry args={[20, 5, 30]} />
              <meshStandardMaterial color={'#00FF00'} />
            </mesh>
            <group position={[3, 2.3, -8.5]} rotation={[0, 0, -Math.PI / 2]}>
                <Text3D
                  position-z={-17}
                  scale={scale}
                  rotation={[0, -Math.PI / 2, 0]}
                  font={FONT_URL}
                >
                  축하합니다! 2048을 달성하셨습니다!
                  <meshStandardMaterial color="green" />
                </Text3D>
                <Text3D
                  position-y={-7}
                  scale={scale}
                  rotation={[0, -Math.PI / 2, 0]}
                  onClick={handleResetClick}
                  font={FONT_URL}
                >
                  -다시하기-
                  <meshStandardMaterial color="blue" />
                </Text3D>
              </group>
          </group>
        )}
        {/* {gameOver && (
          <group position={[200, 30, 160]}>
              <Text3D
                scale={scale}
                rotation={[0, -Math.PI / 2, 0]}
                font={FONT_URL}
              >
                Game Over
                <meshStandardMaterial color="red" />
              </Text3D>
              <Text3D 
                position-y={-7}
                scale={scale}
                rotation={[0, -Math.PI / 2, 0]}
                onClick={handleResetClick}
                font={FONT_URL}
              >
                -다시하기-
                <meshStandardMaterial color="blue" />
              </Text3D>
            </group>
          )} */}
          {/* {gameClear && (
            <group position={[200, 30, 160]}>
              <Text3D
                position-z={-17}
                scale={scale}
                rotation={[0, -Math.PI / 2, 0]}
                font={FONT_URL}
              >
                축하합니다! 2048을 달성하셨습니다!
                <meshStandardMaterial color="green" />
              </Text3D>
              <Text3D
                position-y={-7}
                scale={scale}
                rotation={[0, -Math.PI / 2, 0]}
                onClick={handleResetClick}
                font={FONT_URL}
              >
                -다시하기-
                <meshStandardMaterial color="blue" />
              </Text3D>
            </group>
          )} */}
      </group>
    </>
  );
}

const Tile = ({ value, position }) => {
  const getBrickModel = (value) => {
    switch (value) {
      case 0: return <Bricks0 />;
      case 2: return <Bricks2 />;
      case 4: return <Bricks4 />;
      case 8: return <Bricks8 />;
      case 16: return <Bricks16 />;
      case 32: return <Bricks32 />;
      case 64: return <Bricks64 />;
      case 128: return <Bricks128 />;
      case 256: return <Bricks256 />;
      case 512: return <Bricks512 />;
      case 1024: return <Bricks1024 />;
      case 2048: return <Bricks2048 />;
      default: return <Bricks0 />;
    }
  };

  return (
    <group position={position} scale={[1, 1, 1]} rotation={[Math.PI / 2, Math.PI / 2, 0]}>
      {getBrickModel(value)}
    </group>
  );
};

export default MiniGame2048;


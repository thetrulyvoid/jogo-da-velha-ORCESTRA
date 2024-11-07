import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './Home.module.css';

function Home() {
    const [nomeJogador1, setNomeJogador1] = useState('');
    const [nomeJogador2, setNomeJogador2] = useState('');
    const [modoJogo, setModoJogo] = useState('');

    const navigate = useNavigate();

    const handleNomeJogador1Change = (e) => setNomeJogador1(e.target.value);
    const handleNomeJogador2Change = (e) => setNomeJogador2(e.target.value);

    const handleConfirmarNomes = () => {
        if (nomeJogador1 && nomeJogador2) {
            alert(`Jogadores confirmados: ${nomeJogador1} e ${nomeJogador2}`);

            if (modoJogo === 'Single player') {
                navigate('/singleplayer', { state: { playerOneName: nomeJogador1, playerTwoName: nomeJogador2 } });
            } else if (modoJogo === 'Multiplayer') {
                navigate('/multiplayer', { state: { playerOneName: nomeJogador1, playerTwoName: nomeJogador2 } });
            }
        } else {
            alert('Por favor, insira os nomes de ambos os jogadores');
        }
    };

    const handleModoJogoChange = (modo) => setModoJogo(modo);

    return (
        <div>
            <h1 className={styles.jogo}>Jogo da Velha</h1>
            <p className={styles.modoJogo}>Escolha um modo de jogo</p>
            <div className={styles.modes}>
                <a
                    className={styles.singleButton}
                    onClick={() => handleModoJogoChange('Single player')}
                >
                    Single player
                </a>
                <a
                    className={styles.multiButton}
                    onClick={() => handleModoJogoChange('Multiplayer')}
                >
                    Multiplayer
                </a>
            </div>

            {modoJogo && (
                <div className={styles.formContainer}>
                    <h2>{modoJogo === 'Single player' ? 'Primeiro Jogador' : 'Jogador 1'}</h2>
                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nomeJogador1}
                        onChange={handleNomeJogador1Change}
                    />
                    <h2>{modoJogo === 'Single player' ? 'Jogador oponente' : 'Jogador 2'}</h2>
                    <input
                        type="text"
                        placeholder="Digite o nome do oponente"
                        value={nomeJogador2}
                        onChange={handleNomeJogador2Change}
                    />
                    <button className={styles.confirmButton} onClick={handleConfirmarNomes}>
                        Confirmar Nomes
                    </button>
                </div>
            )}
        </div>
    );
}

export default Home;

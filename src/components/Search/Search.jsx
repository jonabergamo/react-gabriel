import React, { useEffect } from 'react'
import './style.css'
import Button from '../Button/Button'

export default function Search({ onChange, value, onSearch }) {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) { // Verifica se a tecla pressionada é Enter
        onSearch(); // Chama a função onSearch
      }
    };

    document.addEventListener('keydown', handleKeyDown); // Adiciona event listener ao documento

    return () => {
      document.removeEventListener('keydown', handleKeyDown); // Remove o event listener quando o componente é desmontado
    };
  }, [onSearch]);

  return (
    <div className='search-container'>
      <div className='search'>
        <babel htmlFor="" className='text-gradient'>Pesquise aqui a cidade</babel>
        <div className='input-container'>
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24"><g><path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" /></g></svg>
          <input placeholder="Search" onChange={onChange} value={value} type="search" className="input" />
        </div>
      </div>
      <Button onClick={onSearch}>Pesquisar</Button>
    </div>
  )
}

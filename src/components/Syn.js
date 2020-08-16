import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Syn = ({selectedWord}) => {
    const [syn, setSyn] = useState([])

    useEffect(() => {
        axios.get(`https://api.datamuse.com/words?ml=${selectedWord}`).then(res => setSyn(res.data))
    })

    return (
        <div className="syn">
            <h3>Word similar to this one: </h3>
            <ol>
                {syn.splice(0, 3).map((word, i) => <li key={i}>{word.word}</li>)}
            </ol> 
        </div>
    )
}

export default Syn

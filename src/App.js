import { useState } from 'react';
import './App.css';
import { v4 } from "uuid";
import Swal from 'sweetalert2'

function App() {
  const [note, setNote] = useState("");
  const [data, setData] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  const handleChange = (e) => {
    setNote(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!note.trim()) {
      setSubmitted(false);

      Swal.fire({
        position: 'top-center',
        icon: 'warning',
        title: 'Boş kayıt oluşturamazsın.',
        showConfirmButton: false,
        timer: 1000
      })
      return;
    }
    const newNote = {
      id: v4(),
      title: note,
      date: new Date().toLocaleDateString(),
    };

    setData([...data, newNote]);
    setNote("");
    setSubmitted(true);

    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Kayıt başarıyla tamamlandı.',
      showConfirmButton: false,
      timer: 1500
    })

  }

  const handleDeleteModal = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Emin misiniz?',
      text: 'Veriyi silmek istediğinize emin misiniz?',
      showCancelButton: true,
      cancelButtonText: 'Vazgeç',
      confirmButtonText: 'Evet, Sil',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      } else {
        // Silme işlemi iptal edildi
      }
    });
  };


  const handleDelete = (id) => {
    console.log(id);

    const filterData = (data.filter((item) => item.id !== id))
    console.log(filterData);
    setData(filterData);
  }
  return (
    <>
      <div className="container App">
        <h1 className='fs-1 mb-2'>Note Uygulaması</h1>
        <form className='d-flex align-items-center justify-content-center'
          onSubmit={handleSubmit}>
          <input type="text"
            className='form-control w-75 shadow'
            placeholder={submitted === true ? "" 
            : "Herhangi bir yazı yazmadan ekleme yapılamaz." }
            value={note}
            onChange={handleChange}
          />
          <button className='btn btn-primary'>Ekle</button>
        </form>
      </div>
      <div className="container mt-3">
        <h1 className='text-center'>Note List</h1>
        <div className='d-flex align-items-center justify-content-between border px-3 pt-2'>
          <p>No</p>
          <p>Açıklama</p>
          <p>Tarih</p>
          <p>Listeden kaldır</p>
        </div>
        {data.length === 0 && (
          <div className=' mt-2 text-center'>
            <h4>Herhangi bir not eklenmedi...</h4>
          </div>)}
      </div>
      {data.map((item, i) => (
        <div key={item.id} className='container list'>
          <ul className='d-flex align-items-center justify-content-between border-bottom p-3' >
            <li>{i + 1}</li>
            <li>{item.title}</li>
            <li>{item.date}</li>
            <button className='btn btn-danger' 
            onClick={() => handleDeleteModal(item.id)}>Sil</button>
          </ul>
        </div>
      ))}
  </>
  );
}

export default App;

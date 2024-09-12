import React, {useEffect, useState} from 'react';
import Nav from "../../components/Admin/Nav";
import {useNavigate} from "react-router-dom";
// import MenuTable from "../../components/Admin/MenuTable";
// import AddCategoryForm from "../../components/Admin/AddCategoryForm";
// import AddProductFrom from "../../components/Admin/AddProductFrom";


function MenuTable({deleteMode,setEditMode}: any) {
    return <></>;
}

function AddCategoryForm({editMode}: any) {
    return <></>;
}

function AddProductFrom({editMode}: any) {
    return <></>;
}

function DashboardMenu() {
  const navigate = useNavigate()
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showAddProductsForm, setShowAddProductForm] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState({
    show: false,
    mode: '',
    data: {}
  });

  useEffect(() => {
    const token = localStorage.getItem('admin')
    if (!token) navigate('/admin')
  }, [])

  return (
    <div className='admin-dashboard'>
      <Nav/>
      <div className='admin-dashboard-content'>
        <h4>Меню</h4>
        <div>
          <MenuTable deleteMode={deleteMode} setEditMode={setEditMode}/>
          <hr/>
          <div className='menu-controls'>
            <button
              className='primary-button small-btn'
              onClick={() => {
                if(!deleteMode) {
                  setShowAddProductForm(false)
                  setShowAddCategoryForm(true)
                }
              }}
              disabled={showAddCategoryForm}
            >
              Добавить Категорию

            </button>
            <button
              className='primary-button small-btn'
              onClick={() => {
                if(!deleteMode) {
                  setShowAddCategoryForm(false)
                  setShowAddProductForm(true)
                }
              }}
              disabled={showAddProductsForm}
            >Добавить Продукт
            </button>

            <button
              style={{
                borderRadius: 20,
                color: '#fff'
              }}
              className='danger-button small-btn'
              onClick={() => {
                setShowAddCategoryForm(false)
                setShowAddProductForm(false)
                setEditMode({
                  show: false,
                  mode: '',
                  data: {}
                })

                setDeleteMode((prev) => !prev)
              }}
            >{!deleteMode ? 'Удалить/Изменить' : 'Отмена'}
            </button>
          </div>
          {
            (showAddCategoryForm || editMode.mode === 'category') && <AddCategoryForm editMode={editMode}/>
          }

          {
            (showAddProductsForm || editMode.mode === 'product') && <AddProductFrom editMode={editMode} setEditMode={setEditMode} />
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardMenu;

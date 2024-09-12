import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Nav from "../../components/Admin/Nav";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {getOrders} from "../../app/features/AdminSlice";
import OrderTable from "../../components/Admin/OrderTable";
import OrderDetails from "../../components/Admin/OrderDetails";
import EditOrder from "../../components/Admin/EditOrder";

// import Modal from "../../components/Modal";

function Modal({title, setOpenModal}: any) {
  return <></>;
}


function AdminDashboard() {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState('new');
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [selectedOrderAction, setSelectedOrderAction] = useState(null);

  const delivery_statuses = [
    'new',
    'cooking',
    'delivering',
    'delivered'
  ]

  const dispatch = useAppDispatch()
  const {orders} = useAppSelector<any>(store => store.admin)

  useEffect(() => {
    const token = localStorage.getItem('admin')
    if (!token) navigate('/admin')

    dispatch(getOrders())

    setInterval(() => {
      dispatch(getOrders())
    }, 30000)
  }, [])

  return (
    <div className='admin-dashboard'>
      <Nav/>
      <div className='admin-dashboard-content'>
        <div className="order-status-navigation">
          <button
            className='primary-button small-btn'
            onClick={() => setSelectedTable(delivery_statuses[0])}
            disabled={selectedTable === delivery_statuses[0]}
          >
            Новые
          </button>
          <button
            className='primary-button small-btn'
            onClick={() => setSelectedTable(delivery_statuses[1])}
            disabled={selectedTable === delivery_statuses[1]}
          >
            Готовиться
          </button>
          <button
            className='primary-button small-btn'
            onClick={() => setSelectedTable(delivery_statuses[2])}
            disabled={selectedTable === delivery_statuses[2]}
          >
            В Пути
          </button>
          <button
            className='primary-button small-btn'
            onClick={() => setSelectedTable(delivery_statuses[3])}
            disabled={selectedTable === delivery_statuses[3]}
          >
            Доставлено
          </button>
        </div>

        {
          selectedTable === 'new' && <>
            <h4>Новые</h4>
            <div>
              <OrderTable
                orders={orders}
                delivery_status_id={1}
                setOpenModal={setOpenModal}
                setSelectedOrderId={setSelectedOrderId}
                setSelectedOrderAction={setSelectedOrderAction}
              />
            </div>
          </>
        }

        {
          selectedTable === 'cooking' && <>
            <h4>Готовиться</h4>
            <div>
              <OrderTable
                orders={orders}
                delivery_status_id={2}
                setOpenModal={setOpenModal}
                setSelectedOrderId={setSelectedOrderId}
                setSelectedOrderAction={setSelectedOrderAction}
              />
            </div>
          </>
        }

        {
          selectedTable === 'delivering' && <>
            <h4>В Пути</h4>
            <div>
              <OrderTable
                orders={orders}
                delivery_status_id={3}
                setOpenModal={setOpenModal}
                setSelectedOrderId={setSelectedOrderId}
                setSelectedOrderAction={setSelectedOrderAction}
              />
            </div>
          </>
        }

        {
          selectedTable === 'delivered' &&
          <>
            <h4>Доставлено</h4>
            <div>
              <OrderTable
                orders={orders}
                delivery_status_id={4}
                setOpenModal={setOpenModal}
                setSelectedOrderId={setSelectedOrderId}
                setSelectedOrderAction={setSelectedOrderAction}
              />
            </div>
          </>
        }

        { openModal &&
          <Modal title={selectedOrderAction === 'order-details' ? 'Детали заказа' : 'Изменить Заказ'} setOpenModal={setOpenModal}>
            {
              selectedOrderAction === 'order-details' ?
                <OrderDetails orderId={selectedOrderId} /> : <EditOrder orderId={selectedOrderId} />
            }
          </Modal>
        }
      </div>
    </div>
  );
}

export default AdminDashboard;
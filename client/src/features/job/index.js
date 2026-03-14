import {
  Badge,
  Box,
  Typography
} from "@mui/material";
import { useContext, useEffect, useMemo, useState } from "react";
import { Add, Delete, Edit, SignalWifiStatusbarNullOutlined } from '@mui/icons-material'
import Table from "../../components/table";
import api from "../../config/api";
import Loader from "../../components/leader";
import Screen from "../../components/Screen";
import Button from "../../components/button";
import AddJob from "./addJob";
import { AppContext } from "../../context/appContext";


export default function AdminJobsPage() {
  const [data, setData] = useState([])
  const [newItem, setNewItem] = useState({
    title: "",
    description: ""
  })
  const { onShowAlert } = useContext(AppContext);
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const [loading, setLoading] = useState(null)
  const [open, setOpen] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const onAddJob = async (values) => {
    setLoading('add')
    try {
      const response = await api.post("/jobs", values);
      if (response.status !== 201) {
        throw new Error(response.data.message);
      }
      onShowAlert("Job added successfully!", "success");
      fetchData()
      setOpen(false)
      setNewItem({
        title: "",
        description: ""
      })
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      onShowAlert(message, error.message);
    } finally {
      setLoading(null)
    }
  }
  const onUpdateJob = async (values) => {
    setLoading('add')
    try {
      const response = await api.put(`/jobs/${newItem?._id}`, values);
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      onShowAlert("Job udpated successfully!", "success");
      fetchData()
      setOpen(false)
      setIsUpdate(false)
      setNewItem({
        title: "",
        description: ""
      })
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      onShowAlert(message, error.message);
    } finally {
      setLoading(null)
    }
  }
  const onDelete = async (id) => {
    setDeleteLoading(id)
    try {
      const response = await api.delete(`/jobs/${id}`);
      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      onShowAlert("Job deleted successfully!", "success");
      fetchData()
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      onShowAlert(message, error.message);
    } finally {
      setDeleteLoading(null)
    }
  }
  const fetchData = async () => {
    setLoading('initial')
    try {
      const response = await api.get("/jobs", {
        params: {
          page, limit
        }
      });
      if (response.status !== 200) {
        throw new Error("Login failed. Please check your credentials.");
      }
      setData(response.data?.jobs);
      setTotal(response.data?.pagination?.total)
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Something went wrong";
      onShowAlert(message, error.message);
    } finally {
      setLoading(SignalWifiStatusbarNullOutlined)
    }
  }
  const truncateHtmlText = (html = "", limit = 35) => {
    if (!html) return "";

    // remove html tags
    const text = html.replace(/<[^>]*>/g, "").trim();

    if (text.length <= limit) return text;

    return text.slice(0, limit) + "...";
  };
  const labels = [
    "#",
    "Title",
    "Description",
    "Create At",
    "Actions",
  ].filter((item) => item);
  const tableData = useMemo(() => {
    if (!data || data.length === 0) return [];
    return data.map((item, index) => {
      return {
        data: item,
        fields: [
          index + 1,
          item?.title,
          <span dangerouslySetInnerHTML={{
            __html: truncateHtmlText(item?.description)
          }} />,
          item?.createdAt,
          <span
            style={{
              display: "flex",
              gap: 3,
            }}
          >
            {item?._id === deleteLoading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader size={20} loading={deleteLoading != null} color="red" />
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <Edit style={{
                    cursor: "pointer",
                    color: 'blue'
                  }} onClick={() => {
                  setNewItem(item)
                  setIsUpdate(true)
                  setOpen(true)
                }} />
                <Delete
                  onClick={() => onDelete(item._id)}
                  style={{
                    cursor: "pointer",
                    color: 'red'
                  }}
                /></span>
            )}
          </span>
        ].filter((it) => it),
      };
    });
  }, [data, deleteLoading, loading]);

  useEffect(() => {
    fetchData()

  }, [page, limit])

  return (
    <Screen
      loading={loading == 'initial'}
      flow={[
        { label: "Home", to: "/" },
        { label: "Job List", to: "/ip-alias" },
      ]}
    >
      <AddJob
        open={open}
        setOpen={setOpen}
        data={newItem}
        setData={setNewItem}
        onAddJob={(values) => onAddJob(values)}
        onUpdateJob={(values) => { onUpdateJob(values) }}
        isUpdate={isUpdate}
        setIsUpdate={setIsUpdate}
        loading={loading}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: '15px' }}>
        <Box sx={{
          display: "flex",
          marginRight: "20px", // mr-5 = 1.25rem ≈ 20px
          alignItems: "center",
        }}>
          <Button
            text={'Add Job'}
            icon={<Add sx={{ marginRight: '10px' }} />}
            className="w-10"
            onClick={() => setOpen(true)}
            loading={loading == 'add'}
          />
        </Box>
      </Box>
      <Table
        title={"Jobs List"}
        data={tableData}
        labels={labels}
        limit={limit}
        page={page}
        setLimit={setLimit}
        setPage={setPage}
        totalData={total}
      />
    </Screen>
  );
}
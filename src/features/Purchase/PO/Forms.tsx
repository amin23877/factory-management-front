import React, { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from "@material-ui/styles";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import { Tabs, Tab, useMediaQuery, Popover } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { AddRounded, CheckRounded, ClearRounded, MoreVertRounded, WarningRounded } from "@material-ui/icons";

import { BasePaper } from "app/Paper";
import TextField from "app/TextField";
import { FieldSelect, ArraySelect } from "app/Inputs";
import Button from "app/Button";
import LinkSelect from "app/Inputs/LinkFields";
import Dialog from "app/Dialog";

import { IPurchasePOComplete } from "api/purchasePO";
import { ILineItem } from "api/lineItem";
import { IItem } from "api/items";
import { getServiceCategories } from "api/serviceCategories";
import { getServiceClasses } from "api/serviceClass";

import { formatTimestampToDate } from "logic/date";

import "styles/splash.css";
import "styles/main.css";

import PurchasePO from "PDFTemplates/PurchasePO";
import LinkField from "app/Inputs/LinkFields";
import { useLock } from "common/Lock";
import AsyncCombo from "common/AsyncCombo";

export const DocumentForm = ({
  data,
  divToPrint,
}: {
  data: IPurchasePOComplete;
  divToPrint: React.MutableRefObject<HTMLElement | null>;
}) => {
  return (
    <Box>
      <Typography>We made a pdf from your PO, now you can save it</Typography>
      <div style={{ height: 400, overflowY: "auto" }}>
        <div id="myMm" style={{ height: "1mm" }} />
        <div
          id="divToPrint"
          ref={(e) => (divToPrint.current = e)}
          style={{
            backgroundColor: "#fff",
            color: "black",
            width: "835px",
            marginLeft: "auto",
            marginRight: "auto",
            minHeight: "1200px",
          }}
        >
          <PurchasePO
            vendor={{ name: "test vendor" } as any}
            contact={{ firstName: "test", lastName: "testtest" } as any}
            lines={data.lines}
            sum={0}
          />
        </div>
      </div>
    </Box>
  );
};

export const FinalForm = () => {
  // const handleSubmit = async () => {
  //   try {
  //     // const { ContactId, requester, status, VendorId, lines } = data;
  //     const { lines } = data;
  //     let newLines = [...lines];
  //     newLines.forEach(function (v: any) {
  //       delete v.date;
  //       delete v.id;
  //       delete v.PurchasePOId;
  //       delete v.PurchaseSOId;
  //       delete v.QuoteId;
  //       delete v.SOId;
  //       delete v.updatedAt;
  //     });
  //     const resp = await createPurchasePOComplete({
  //       ...data,
  //       lines: newLines,
  //     } as IPurchasePOComplete);
  //     if (resp) {
  //       console.log(resp);
  //       onDone(resp);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     console.log(error.response.data.error);
  //     setError(error.response.data.error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Box height="85%" display="flex" flexDirection="column">
      <Typography variant="h5">Are you sure?</Typography>
      <Typography variant="subtitle1" style={{ margin: "1em 0" }}>
        If you finalize your Purchase order, You can't update it, So if you want to update it you should make new
        version or add new one
      </Typography>
    </Box>
  );
};

const style = {
  padding: "10px 20px",
  borderBottom: "1px solid whiteSmoke",
  color: "white",
};
const useStyle = makeStyles(() => ({
  root: {
    padding: "0px 16px",
  },
}));
export const LinesForm = ({
  devices,
  createdItems,
  handleSubmit,
  handleDelete,
  handleAddService,
  handleEdit,
}: {
  devices?: IItem[];
  createdItems: ILineItem[];
  handleSubmit: (lineItem: ILineItem, item: IItem | undefined) => void;
  handleDelete: (index: number) => void;
  handleAddService: (lineItem: ILineItem, index: any, service: any, itemId?: string) => void;
  handleEdit: (lineItem: ILineItem, index: any, item: any, belongsTo?: number, itemId?: string) => void;
}) => {
  const classes = useStyle();

  const [selectedItem, setSelectedItem] = useState<IItem | undefined>();
  const [addService, setAddService] = useState<string | undefined>(undefined);
  const [addLineService, setAddLineService] = useState<Boolean>(false);
  const [addOption, setAddOption] = useState<any>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorBEl, setAnchorBEl] = React.useState<HTMLButtonElement | null>(null);
  const [index, setIndex] = React.useState<any>();
  const [clickedItem, setClickedItem] = useState<any>();
  const [edit, setEdit] = useState<any>();
  const [displayItems, setDisplayItems] = useState<ILineItem[]>();

  const handleClick = (e: any, id: any, i: any) => {
    setClickedItem(id);
    setIndex(i);
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorBEl(null);
  };
  useEffect(() => {
    const renderTable = () => {
      let counter = 0;
      const display = createdItems.map((item: any, i: number) => {
        if (!item.belongsTo) {
          counter++;
        }
        return { ...item, group: counter };
      });
      setDisplayItems(display);
    };
    renderTable();
  }, [createdItems]);

  const open = Boolean(anchorEl);
  const openB = Boolean(anchorBEl);
  const id = open ? "simple-popover" : undefined;
  const idB = openB ? "simple-popover" : undefined;
  const schema = Yup.object().shape({
    ItemId: Yup.string().required(),
    quantity: Yup.number().required().min(1),
    price: Yup.number().required(),
  });
  const phone = useMediaQuery("(max-width:900px)");

  return (
    <BasePaper style={phone ? { height: "80vh", overflow: "auto" } : { overflow: "auto", height: "100%" }}>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          style={{
            background: "#373a4d",
            cursor: "pointer",
          }}
        >
          <span
            style={style}
            onClick={(e) => {
              setAddService(clickedItem.ItemId);
              handleClose();
            }}
          >
            Add Service
          </span>
          <span
            style={style}
            onClick={(e) => {
              setAddOption(clickedItem.ItemId);
              handleClose();
            }}
          >
            Add Option
          </span>
          <span
            style={style}
            onClick={() => {
              handleClose();
              setEdit(clickedItem);
            }}
          >
            Edit
          </span>
          <span
            style={{ ...style, border: "none" }}
            onClick={() => {
              handleClose();
              handleDelete(index);
            }}
          >
            Delete
          </span>
        </Box>
      </Popover>
      <Popover
        id={idB}
        open={openB}
        anchorEl={anchorBEl}
        onClose={() => {
          setAnchorBEl(null);
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          style={{
            background: "#373a4d",
            cursor: "pointer",
          }}
        >
          <span
            style={style}
            onClick={() => {
              handleClose();
              setEdit(clickedItem);
            }}
          >
            Edit
          </span>
          <span
            style={{ ...style, border: "none" }}
            onClick={() => {
              handleClose();
              handleDelete(index);
            }}
          >
            Delete
          </span>
        </Box>
      </Popover>
      <Dialog
        onClose={() => {
          setAddLineService(false);
        }}
        open={Boolean(addLineService)}
        title="Add Service"
        maxWidth="xs"
        fullWidth
      >
        <AddLineServiceForm
          onClose={() => setAddLineService(false)}
          handleAddService={(d: ILineItem, i: IItem) => {
            handleSubmit(d, i);
          }}
        />
      </Dialog>
      <Dialog
        onClose={() => {
          setAddService(undefined);
        }}
        open={Boolean(addService)}
        title="Add Service"
        maxWidth="xs"
        fullWidth
      >
        <AddServiceForm
          onClose={() => setAddService(undefined)}
          itemId={addService}
          handleAddService={(d: ILineItem, i: IItem) => {
            handleAddService(d, index + 1, i, addService);
          }}
          service
        />
      </Dialog>
      <Dialog
        onClose={() => {
          setAddOption(false);
        }}
        open={addOption}
        title="Add Option"
        maxWidth="xs"
        fullWidth
      >
        <AddServiceForm
          onClose={() => setAddOption(false)}
          itemId={addOption}
          handleAddService={(d: ILineItem, i: IItem) => {
            handleAddService(d, index + 1, i);
          }}
          option
        />
      </Dialog>
      {edit && (
        <Dialog
          onClose={() => {
            setEdit(false);
          }}
          open={edit}
          title="Edit Line Item"
          maxWidth="xs"
          fullWidth
        >
          <AddServiceForm
            edit={edit}
            onClose={() => setEdit(false)}
            handleAddService={(d: ILineItem, i: IItem, belongsTo?: number, itemId?: string) => {
              handleEdit(d, index, i, belongsTo, itemId);
            }}
          />
        </Dialog>
      )}
      <Box display="flex" width="100%" maxHeight="calc(100vh - 2300px)">
        <Box flex={1}>
          <Formik
            initialValues={
              selectedItem
                ? ({
                    price: selectedItem?.retailPrice,
                    ItemId: selectedItem?.id,
                    quantity: 1,
                  } as ILineItem)
                : ({} as ILineItem)
            }
            validationSchema={schema}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values, selectedItem);
            }}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue, handleBlur, errors, resetForm }) => (
              <Form>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setAddLineService(true);
                  }}
                  style={{ marginBottom: "10px" }}
                >
                  Add Service
                </Button>
                <Table>
                  <TableHead style={{ backgroundColor: "#373a4d", color: "white" }}>
                    <TableRow>
                      <TableCell style={{ color: "white" }}>Group</TableCell>
                      <TableCell style={{ color: "white" }}>Sort</TableCell>
                      <TableCell style={{ color: "white" }}>Part Number</TableCell>
                      <TableCell style={{ color: "white" }}>Qty / period</TableCell>
                      <TableCell style={{ color: "white" }}>Price</TableCell>
                      <TableCell width={50} style={{ color: "white", padding: "2px" }}>
                        Tax
                      </TableCell>
                      <TableCell width={80} style={{ color: "white", padding: "0px" }}>
                        Total
                      </TableCell>
                      <TableCell width={50} style={{ color: "white" }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell width={50}>
                        <IconButton type="submit" style={{ padding: "0px", color: "green" }}>
                          <AddRounded />
                        </IconButton>
                      </TableCell>
                      <TableCell width={50}></TableCell>
                      <TableCell style={{ padding: "2px" }}>
                        <LinkSelect
                          filterLabel="no"
                          path="/item?salesApproved=true&fru=false"
                          value={typeof values.ItemId === "string" ? values.ItemId : values.ItemId?.id}
                          label=""
                          getOptionList={(resp) => (devices ? devices : resp?.result)}
                          getOptionLabel={(item) => (devices ? item.number.no : item?.no)}
                          getOptionValue={(item) => item?.id}
                          onChange={(e, nv) => {
                            setFieldValue("ItemId", devices ? nv.number.id : nv.id);
                            setSelectedItem(nv);
                          }}
                          onBlur={handleBlur}
                          url="/panel/inventory"
                          error={Boolean(errors.ItemId)}
                        />
                      </TableCell>
                      <TableCell width={90} style={{ padding: "2px" }}>
                        <TextField
                          type="number"
                          name="quantity"
                          value={values.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.quantity)}
                        />
                      </TableCell>
                      <TableCell width={90} style={{ padding: "2px" }}>
                        <TextField
                          type="number"
                          name="price"
                          value={values.price}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={Boolean(errors.price)}
                        />
                      </TableCell>
                      <TableCell style={{ padding: "2px" }}>
                        <FormControlLabel
                          style={{ width: "100%" }}
                          checked={values.tax}
                          label="Tax"
                          name="tax"
                          onChange={handleChange}
                          control={<CheckBox />}
                        />
                      </TableCell>
                      <TableCell style={{ padding: "0px" }}></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    {displayItems?.map((item: any, i: number) => {
                      return (
                        <TableRow style={item.belongsTo ? { background: "rgba(40,30,150,0.1)" } : {}}>
                          <TableCell className={item.belongsTo ? classes.root : ""}>{item.group}</TableCell>
                          <TableCell className={item.belongsTo ? classes.root : ""}>{item.sort}</TableCell>
                          <TableCell className={item.belongsTo ? classes.root : ""} style={{ position: "relative" }}>
                            <span>{item?.i?.no}</span>
                            <span
                              style={{
                                color: "orange",
                                position: "absolute",
                                right: 0,
                              }}
                            >
                              {!item?.i?.engineeringApproved && <WarningRounded />}
                            </span>
                          </TableCell>
                          <TableCell className={item.belongsTo ? classes.root : ""}>{item.quantity}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell className={item.belongsTo ? classes.root : ""}>
                            {item.tax ? <CheckRounded /> : <ClearRounded />}
                          </TableCell>
                          <TableCell className={item.belongsTo ? classes.root : ""}>
                            {item.quantity * item.price}
                          </TableCell>
                          <TableCell className={item.belongsTo ? classes.root : ""}>
                            {item.belongsTo ? (
                              <span
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                  setClickedItem(item);
                                  setIndex(i);
                                  setAnchorBEl(e.currentTarget);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                <MoreVertRounded />
                              </span>
                            ) : (
                              <span
                                onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleClick(e, item, i)}
                                style={{ cursor: "pointer" }}
                              >
                                <MoreVertRounded />
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </BasePaper>
  );
};

export const AddLineServiceForm = ({ handleAddService, onClose }: { handleAddService: any; onClose: any }) => {
  const [selectedItem, setSelectedItem] = useState<IItem | undefined>();

  const handleSubmit = (d: any) => {
    handleAddService(d, selectedItem);
    onClose();
  };
  const schema = Yup.object().shape({
    ItemId: Yup.string().required(),
    quantity: Yup.number().required().min(1),
    price: Yup.number().required(),
  });
  return (
    <Box>
      <Box display="flex">
        <Box flex={1} mr={2}>
          <Formik
            initialValues={
              {
                price: selectedItem?.retailPrice,
                ItemId: selectedItem?.id,
                quantity: 1,
                ServiceClassId: undefined,
                ServiceCategoryId: undefined,
              } as any
            }
            validationSchema={schema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
              <Form>
                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                  <FieldSelect
                    request={getServiceClasses}
                    itemTitleField="name"
                    itemValueField="id"
                    label="Class"
                    name="ServiceClassId"
                    value={typeof values.ServiceClassId == "string" ? values.ServiceClassId : values.ServiceClassId?.id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ServiceClassId)}
                    fullWidth
                  />
                  <FieldSelect
                    request={getServiceCategories}
                    itemTitleField="name"
                    itemValueField="id"
                    label="Category"
                    name="ServiceCategoryId"
                    value={
                      typeof values.ServiceCategoryId == "string"
                        ? values.ServiceCategoryId
                        : values.ServiceCategoryId?.id
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.ServiceCategoryId)}
                    fullWidth
                  />
                  {values.ServiceCategoryId && values.ServiceClassId && (
                    <LinkSelect
                      filterLabel="no"
                      path={`/service?ServiceCategoryId=${values.ServiceCategoryId}&ServiceClassId=${values.ServiceClassId}`}
                      value={typeof values.ItemId === "string" ? values.ItemId : values.i?.id}
                      label={"Service"}
                      getOptionList={(resp) => resp.result}
                      getOptionLabel={(item) => item?.no}
                      getOptionValue={(item) => item?.id}
                      onChange={(e, nv) => {
                        setFieldValue("ItemId", nv.id);
                        setSelectedItem(nv);
                      }}
                      onBlur={handleBlur}
                      url={"/panel/service"}
                      error={Boolean(errors.ItemId)}
                    />
                  )}
                  <TextField
                    name="quantity"
                    label="Period"
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.quantity)}
                  />
                  <TextField
                    name="price"
                    label="Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.price)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Button style={{ margin: "0 0.5em" }} type="submit" kind="add">
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export const AddServiceForm = ({
  itemId,
  handleAddService,
  onClose,
  option,
  edit,
  service,
}: {
  itemId?: any;
  handleAddService: any;
  onClose: any;
  option?: boolean;
  service?: boolean;
  edit?: any;
}) => {
  const [selectedItem, setSelectedItem] = useState<IItem | undefined>(edit?.i);

  const handleSubmit = (d: ILineItem) => {
    handleAddService(d, selectedItem, edit?.belongsTo, edit?.belongsToItemId);
    onClose();
  };
  console.log({ edit });
  const schema = Yup.object().shape({
    ItemId: Yup.string().required(),
    quantity: Yup.number().required().min(1),
    price: Yup.number().required(),
  });
  return (
    <Box>
      <Box display="flex">
        <Box flex={1} mr={2}>
          <Formik
            initialValues={
              edit
                ? ({
                    price: edit.price,
                    quantity: edit.quantity,
                    ItemId: selectedItem?.id,
                    tax: edit.tax,
                  } as ILineItem)
                : ({
                    price: selectedItem?.retailPrice,
                    ItemId: selectedItem?.id,
                    quantity: 1,
                  } as ILineItem)
            }
            validationSchema={schema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ values, handleChange, setFieldValue, handleBlur, errors }) => (
              <Form>
                <Box display="grid" gridTemplateColumns="1fr" gridRowGap={10}>
                  {edit ? (
                    edit.i.Category === "Service" || (edit.i.option && edit.belongsTo) ? (
                      <LinkSelect
                        filterLabel="no"
                        path={edit.i.option ? "/item?class=option" : `/item/${edit.belongsToItemId}/service`}
                        value={typeof values.ItemId === "string" ? values.ItemId : values.i?.id}
                        label={edit.i.option ? "Option" : "Service"}
                        getOptionList={(resp) => (edit.i.option ? resp.result : resp)}
                        getOptionLabel={(item) => item?.no}
                        getOptionValue={(item) => item?.id}
                        onChange={(e, nv) => {
                          setFieldValue("ItemId", nv.id);
                          setSelectedItem(nv);
                        }}
                        onBlur={handleBlur}
                        url={edit.i.option ? "/panel/inventory" : "/panel/service"}
                        error={Boolean(errors.ItemId)}
                        choseItem={edit?.i}
                      />
                    ) : (
                      <LinkSelect
                        filterLabel="no"
                        path={"/item?salesApproved=true&fru=false"}
                        value={values.ItemId}
                        label="Item"
                        getOptionList={(resp) => resp.result}
                        getOptionLabel={(item) => item?.no}
                        getOptionValue={(item) => item?.id}
                        onChange={(e, nv) => {
                          setFieldValue("ItemId", nv.id);
                          setSelectedItem(nv);
                        }}
                        onBlur={handleBlur}
                        url={option ? "/panel/inventory" : "/panel/service"}
                        error={Boolean(errors.ItemId)}
                        choseItem={edit?.i}
                      />
                    )
                  ) : (
                    <LinkSelect
                      filterLabel="no"
                      path={option ? "/item?option=true" : `/item/${itemId}/service`}
                      value={typeof values.ItemId === "string" ? values.ItemId : values.i?.id}
                      label={option ? "Option" : "Service"}
                      getOptionList={(resp) => (option ? resp.result : resp)}
                      getOptionLabel={(item) => item?.no}
                      getOptionValue={(item) => item?.id}
                      onChange={(e, nv) => {
                        setFieldValue("ItemId", nv.id);
                        setSelectedItem(nv);
                      }}
                      onBlur={handleBlur}
                      url={option ? "/panel/inventory" : "/panel/service"}
                      error={Boolean(errors.ItemId)}
                    />
                  )}
                  <TextField
                    name="quantity"
                    label={service ? "Period" : "quantity"}
                    value={values.quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.quantity)}
                  />
                  <TextField
                    name="price"
                    label="Price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.price)}
                    InputLabelProps={{ shrink: true }}
                  />
                  {edit?.belongsTo || !edit ? (
                    <TextField
                      name="sort"
                      label="Sort"
                      value={values.sort}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(errors.sort)}
                    />
                  ) : (
                    <></>
                  )}
                  {!service && (
                    <FormControlLabel
                      style={{ width: "100%" }}
                      checked={values.tax}
                      label="Tax"
                      name="tax"
                      onChange={handleChange}
                      control={<CheckBox />}
                    />
                  )}

                  <Box display="flex" alignItems="center" justifyContent="center">
                    <Button style={{ margin: "0 0.5em" }} type="submit" kind={edit ? "edit" : "add"}>
                      {edit ? "save" : "Submit"}
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export const CreateForm = ({
  errors,
  values,
  handleBlur,
  handleChange,
  setFieldValue,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  errors: any;
  setFieldValue: any;
}) => {
  const [activeMoreTab, setActiveMoreTab] = useState(0);

  return (
    <Box display="flex">
      <BasePaper
        style={{
          boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
          height: "100%",
          flex: "2",
        }}
      >
        <Box display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10} flex={2}>
          <LinkField
            value={typeof values.SOId === "string" ? values.SOId : values.SOId?.id}
            choseItem={typeof values.SOId === "string" ? values.SOId : values.SOId?.id}
            label="SO Number"
            path="/so"
            filterLabel="number"
            getOptionList={(resp) => resp?.result}
            getOptionLabel={(item) => item?.number || "No-Number"}
            getOptionValue={(item) => item?.id}
            onChange={(e, nv) => {
              setFieldValue("SOId", nv.id);
            }}
            url="/panel/sales/so"
          />
          <LinkField
            value={values.VendorId}
            choseItem={values.VendorId}
            label="Vendor"
            path="/vendor"
            filterLabel="name"
            getOptionList={(resp) => resp?.result}
            getOptionLabel={(item) => item?.name || "No-Number"}
            getOptionValue={(item) => item?.id}
            onChange={(e, nv) => {
              setFieldValue("VendorId", nv.id);
            }}
            url="/panel/purchase/vendor"
          />
          <TextField label="Approved By" value={values.approvedBy?.username} fullWidth disabled />
          <TextField
            name="terms"
            label="Terms"
            value={values.terms}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(errors.terms)}
            fullWidth
          />
          <TextField
            style={{ gridColumnEnd: "span 2" }}
            name="note"
            value={values.note}
            label="PO note"
            multiline
            rows={4}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Box>
        <BasePaper
          style={{
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
            height: "100%",
          }}
        >
          <Tabs
            textColor="primary"
            value={activeMoreTab}
            onChange={(e, nv) => setActiveMoreTab(nv)}
            variant="scrollable"
            style={{ maxWidth: 700 }}
          >
            <Tab label="More Info" />
            <Tab label="Addresses" />
          </Tabs>
          <Box>
            {activeMoreTab === 0 && (
              <MoreInfoForm
                lock={false}
                errors={errors}
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                addForm={true}
              />
            )}
            {activeMoreTab === 1 && (
              <AddressesForm values={values} handleBlur={handleBlur} handleChange={handleChange} addForm={true} />
            )}
          </Box>
        </BasePaper>
      </BasePaper>
    </Box>
  );
};

export const UpdateForm = ({
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  errors: any;
  setFieldValue: (n: string, v: any) => void;
}) => {
  const phone = useMediaQuery("(max-width:900px)");
  const { lock } = useLock();
  return (
    <>
      <Box display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"} gridRowGap={7} gridColumnGap={7}>
        <TextField name="number" label="PO Number" value={values.number} disabled />
        <TextField
          name="type"
          label="PO Type"
          value={values.type}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={lock}
        />
        <TextField label="So Number" value={values._soNumber} fullWidth disabled InputLabelProps={{ shrink: true }} />
        <AsyncCombo
          url="/vendor"
          filterBy="name"
          getOptionLabel={(o) => o.name || ""}
          getOptionSelected={(o, v) => o.id === v.id}
          value={values.VendorId}
          onChange={(e, nv) => setFieldValue("VendorId", nv?.id)}
          disabled={lock}
        />
        <TextField label="Approved By" value={values.approvedBy?.username} fullWidth disabled />
        <ArraySelect
          items={[
            "Quoted",
            "Pending",
            "Printed",
            "Closed",
            "Acknowledged",
            "Shipped",
            "Received",
            "Canceled",
            "On Hold",
          ]}
          name="status"
          label="PO Status"
          value={values.status}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.status)}
          fullWidth
          disabled={lock}
        />
        <TextField
          name="terms"
          label="Terms"
          value={values.terms}
          onChange={handleChange}
          onBlur={handleBlur}
          error={Boolean(errors.terms)}
          fullWidth
          disabled={lock}
        />
        <Paper
          style={
            phone
              ? {
                  paddingLeft: "0.5em",
                  backgroundColor: "#eee",
                }
              : {
                  paddingLeft: "0.5em",
                  backgroundColor: "#eee",
                  gridColumnEnd: "span 2",
                }
          }
        >
          <FormControlLabel
            style={{ width: "100%" }}
            checked={values.approved}
            label="Approved"
            name="approved"
            disabled={lock}
            onChange={handleChange}
            control={<CheckBox size="small" />}
          />
        </Paper>
        <TextField
          style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
          value={values.publicNote}
          name="publicNote"
          label="Note"
          disabled={lock}
          multiline
          rows={3}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          style={phone ? { gridColumnEnd: "span 2" } : { gridColumnEnd: "span 3" }}
          value={values.description}
          name="description"
          label="Description"
          multiline
          disabled={lock}
          rows={3}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Box>
    </>
  );
};

export const MoreInfoForm = ({
  values,
  errors,
  handleBlur,
  handleChange,
  setFieldValue,
  addForm,
  lock,
}: {
  values: any;
  handleChange: any;
  handleBlur: any;
  errors: any;
  setFieldValue: any;
  addForm?: boolean;
  lock: boolean;
}) => {
  return (
    <>
      <Box my={2} display="grid" gridTemplateColumns="1fr 1fr" gridRowGap={10} gridColumnGap={10}>
        {!addForm && <TextField label="PO Date" value={formatTimestampToDate(values.date)} disabled />}
        <TextField
          type="date"
          size="small"
          value={values.acknowledgeDate}
          name="acknowledgeDate"
          label="Ack. Date"
          onChange={(date) => setFieldValue(" acknowledgeDate", date)}
          onBlur={handleBlur}
          disabled={!addForm && lock}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          size="small"
          value={values.estShipDate}
          name="estShipDate"
          label="Estimated ship date"
          onChange={(date) => setFieldValue("estShipDate", date)}
          onBlur={handleBlur}
          disabled={!addForm && lock}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          size="small"
          value={values.actShipDate}
          name="actShipDate"
          label="Actual ship date"
          onChange={(date) => setFieldValue("actShipDate", date)}
          onBlur={handleBlur}
          disabled={!addForm && lock}
          InputLabelProps={{ shrink: true }}
        />
        {!addForm && (
          <TextField label="Approved Date" value={formatTimestampToDate(values.approvedDate)} fullWidth disabled />
        )}
        <TextField
          size="small"
          value={values.requiredBy}
          name="requiredBy"
          label="Required By"
          onChange={(date) => setFieldValue("requiredBy", date)}
          onBlur={handleBlur}
          disabled={!addForm && lock}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          size="small"
          value={values.sentDate}
          name="sentDate"
          label="Date Sent"
          onChange={(date) => setFieldValue("sentDate", date)}
          onBlur={handleBlur}
          disabled={!addForm && lock}
          type="date"
          InputLabelProps={{ shrink: true }}
        />
      </Box>
    </>
  );
};

export const AddressesForm = ({
  handleChange,
  handleBlur,
  values,
  addForm,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
  addForm?: boolean;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const phone = useMediaQuery("(max-width:900px)");
  const { lock, setLock } = useLock();

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Tabs
          textColor="primary"
          value={activeTab}
          onChange={(e, nv) => {
            setActiveTab(nv);
            setLock(true);
          }}
          variant="scrollable"
          style={{ maxWidth: 600 }}
        >
          <Tab label="Billing Address" />
          <Tab label="Shipping Address" />
        </Tabs>
      </Box>
      {activeTab === 0 && (
        <Box my={1} display="grid" gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"} gridGap={10} gridRowGap={10}>
          <TextField
            value={values.billingCompany}
            name="billingCompany"
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingAttn}
            name="billingAttn"
            label="Attn"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />

          <TextField
            value={values.billingAddress}
            name="billingAddress"
            label="Address"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingCity}
            name="billingCity"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingState}
            name="billingState"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingZipcode}
            name="billingZipcode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingCountry}
            name="billingCountry"
            label="Country"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingPhone}
            name="billingPhone"
            label="Phone"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.billingEmail}
            name="billingEmail"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}

            // style={{ gridColumnEnd: "span 2" }}
          />
        </Box>
      )}
      {activeTab === 1 && (
        <Box
          my={1}
          display="grid"
          gridTemplateColumns={phone ? "1fr 1fr" : "1fr 1fr 1fr"}
          gridGap={10}
          gridRowGap={10}
          gridColumnGap={10}
        >
          <TextField
            value={values.shippingCompany}
            name="shippingCompany"
            label="Company"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingAttn}
            name="shippingAttn"
            label="Attn"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingAddress}
            label="Address"
            name="shippingAddress"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingCity}
            name="shippingCity"
            label="City"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingState}
            name="shippingState"
            label="State"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingZipcode}
            name="shippingZipcode"
            label="Zip Code"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingCountry}
            name="shippingCountry"
            label="Country"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingPhone}
            name="shippingPhone"
            label="Phone"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}
          />
          <TextField
            value={values.shippingEmail}
            name="shippingEmail"
            label="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!addForm && lock}

            // style={{ gridColumnEnd: "span 2" }}
          />
        </Box>
      )}
    </>
  );
};

export const VendorForm = ({
  handleChange,
  handleBlur,
  values,
}: {
  values: any;
  handleChange: (a: any) => void;
  handleBlur: (a: any) => void;
}) => {
  return (
    <>
      <Box my={1} display="grid" gridTemplateColumns=" 1fr 1fr" gridGap={10} gridRowGap={10}>
        <TextField label="Vendor ID" value={values.VendorId?.number} fullWidth disabled />
        <TextField label="Vendor Name" value={values.VendorId?.name} fullWidth disabled />
        <TextField value={values.VendorId?.address} name="Address" label="Address" disabled />
        <TextField value={values.VendorId?.state} name="State" label="State" disabled />
        <TextField value={values.VendorId?.zipcode} name="ZipCode" label="Zip Code" disabled />
        <TextField value={values.VendorId?.website} name="website" label="website" disabled />
        <TextField value={values.contact?.lastName} name="contactPerson" label="Contact Person" disabled />
        <TextField value={values.contact?.email} name="email" label="Email" disabled />
        <TextField value={values.contact?.phone} name="phone" label="Phone" disabled />
      </Box>
    </>
  );
};

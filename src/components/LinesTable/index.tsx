import { AddLineService } from "./AddLineService";
import { SubGroupPopover } from "./SubGroupPopover";
import { DevicePopover } from "./DevicePopover";
import React, { useState, useEffect } from "react";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";
import { useMediaQuery } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/styles";
import { AddRounded, CheckRounded, ClearRounded, MoreVertRounded, WarningRounded } from "@material-ui/icons";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { BasePaper } from "app/Paper";
import TextField from "app/TextField";
import Button from "app/Button";
import LinkSelect from "app/Inputs/LinkFields";
import Dialog from "app/Dialog";
import { AddServiceForm } from "features/Purchase/PO/Forms";

import { ILineItem } from "api/lineItem";
import { IItem } from "api/items";
import "styles/splash.css";
import "styles/main.css";

const schema = Yup.object().shape({
  ItemId: Yup.string().required(),
  quantity: Yup.number().required().min(1),
  price: Yup.number().required(),
});

const useStyle = makeStyles(() => ({
  root: {
    padding: "0px 16px",
  },
}));

export default function LinesTable({
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
}) {
  const classes = useStyle();

  const [selectedItem, setSelectedItem] = useState<IItem | undefined>();
  const [addService, setAddService] = useState<string | undefined>(undefined);
  const [addLineService, setAddLineService] = useState<boolean>(false);
  const [addOption, setAddOption] = useState<any>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorBEl, setAnchorBEl] = React.useState<HTMLButtonElement | null>(null);
  const [index, setIndex] = React.useState<any>();
  const [clickedItem, setClickedItem] = useState<any>();
  const [edit, setEdit] = useState<any>();
  const [displayItems, setDisplayItems] = useState<ILineItem[]>();

  const open = Boolean(anchorEl);
  const openB = Boolean(anchorBEl);
  const phone = useMediaQuery("(max-width:900px)");

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

  return (
    <BasePaper style={phone ? { height: "80vh", overflow: "auto" } : { overflow: "auto", height: "100%" }}>
      <DevicePopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        setAddService={setAddService}
        setAddOption={setAddOption}
        setEdit={setEdit}
        clickedItem={clickedItem}
        onDelete={handleDelete}
        index={index}
      />
      <SubGroupPopover
        open={openB}
        anchorEl={anchorBEl}
        index={index}
        clickedItem={clickedItem}
        setAnchorEl={setAnchorBEl}
        onClose={handleClose}
        setEdit={setEdit}
        onDelete={handleDelete}
      />
      <AddLineService
        setAddLineService={setAddLineService}
        addLineService={addLineService}
        handleSubmit={handleSubmit}
      />
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
              const group = (displayItems?.length || 0) + 1;
              handleSubmit({ ...values, group } as any, selectedItem);
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
}

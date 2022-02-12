import React, { useState, useEffect, useCallback } from "react";
import { LinearProgress, Box, makeStyles, Typography } from "@material-ui/core";
import { EditRounded } from "@material-ui/icons";

import DataGrid from "@inovua/reactdatagrid-community";

import AddPartModal from "./AddPartModal";
import ChangePartModal from "./ChangePartModal";
import RenamePart from "./RenamePart";

import Button from "../../../app/Button";
import Toast from "../../../app/Toast";

import { getMatrix, postMatrixData, IMatrix } from "../../../api/matrix";
import {
	extractLevels,
	generateDataGridColumns,
	generateDataGridFilterValues,
	generateRows,
	extractColumns,
} from "../../../logic/matrix";

const useStyles = makeStyles({
	root: {
		"& .InovuaReactDataGrid__column-header": {
			background: "#202731",
			color: "#fff",
		},
	},
});

type ITableChangeCell = {
	ItemId: string;
	usage: number;
	location?: string;
	uom?: string;
	fixedQty?: boolean;
};

type ITableChangeRow = {
	device: string;
	cells: ITableChangeCell[];
};

export default function NewBomTable({ productFamily }: { productFamily: string }) {
	// const { data: tableData, mutate: mutateTableData } = useSWR<IMatrix>(`/matrice/${productFamily}`);
	const [tableData, setTableData] = useState<IMatrix>();

	const classes = useStyles();

	const [addPart, setAddPart] = useState(false);
	const [changePart, setChangePart] = useState(false);
	const [renamePart, setRenamePart] = useState(false);

	const [selectedRow, setSelectedRow] = useState<any>();
	const [selectedPart, setSelectedPart] = useState<{ formerName: string; newName: string }>();
	const [selectedRowName, setSelectedRowName] = useState<string>();
	const [changes, setChanges] = useState<ITableChangeRow[]>([]);

	const [tableColumns, setTableColumns] = useState<any[]>([]);
	const [tableRows, setTableRows] = useState<any[]>([]);
	const [tableDefaultFilters, setTableDefaultFilters] = useState<any[] | null>(null);

	const refreshTableData = useCallback(async () => {
		try {
			const resp = await getMatrix(productFamily);
			setTableData(resp);
		} catch (error) {
			console.log(error);
		}
	}, [productFamily]);

	useEffect(() => {
		refreshTableData();
	}, [refreshTableData]);

	const handleChangePartName = useCallback((header: string) => {
		setSelectedPart({ formerName: header, newName: "" });
		setRenamePart(true);
	}, []);

	const handleRenamePart = ({ formerName, newName }: { formerName: string; newName: string }) => {
		const changedRows = tableRows
			.filter((td) => td[formerName] && td.DeviceId)
			.map((td) => ({
				device: td.DeviceId,
				cells: td.parts.map((p: any) => ({
					ItemId: p.ItemId._id || p.ItemId.id,
					usage: p.usage || 1,
					name: p.name === formerName ? newName : p.name,
				})),
			}));
		setChanges(changedRows);

		setTableColumns((prev) => {
			const temp = prev.concat();
			let index = temp.findIndex((c: any) => c.name === formerName);
			if (index > -1) {
				temp[index] = {
					name: newName,
					render: ({ data }: any) => data[newName]?.ItemId?.no,
					minWidth: 180,
					editable: false,
					sortable: false,
					header: (
						<div style={{ width: 80, display: "flex", alignItems: "center" }}>
							<Typography variant="caption">{newName}</Typography>
							<Button size="small" onClick={() => handleChangePartName(newName)}>
								<EditRounded htmlColor="white" fontSize="small" />
							</Button>
						</div>
					),
				};
			}

			return temp;
		});

		setTableRows((prev) => {
			let tempRow: any;
			let temp = prev.concat();
			temp = temp.map((tr) => {
				tempRow = JSON.parse(JSON.stringify(tr));
				if (tempRow[formerName]) {
					tempRow[newName] = tempRow[formerName];
					delete tempRow[formerName];
				}
				return tempRow;
			});

			return temp;
		});

		setTableDefaultFilters((prev: any) => {
			const temp = prev?.concat();
			let index = temp.findIndex((c: any) => c.name === formerName);
			if (index > -1) {
				temp[index] = { name: newName, operator: "startsWith", type: "string", value: "" };
			}

			return temp;
		});

		setRenamePart(false);
	};

	useEffect(() => {
		if (tableData) {
			const levels = extractLevels(tableData);
			const columns = generateDataGridColumns(extractColumns({ tableData, levels }), handleChangePartName);
			const rows = generateRows({ tableData, levels });

			const defaultFilterValues = generateDataGridFilterValues(extractColumns({ tableData, levels }));

			// setTable({ columns, rows, defaultFilterValues });
			setTableColumns(columns);
			setTableRows(rows);
			setTableDefaultFilters(defaultFilterValues);
		}
	}, [handleChangePartName, productFamily, tableData]);

	const handleAddPart = (name: string) => {
		setTableColumns((prev) => {
			const temp = prev.concat();
			temp.push({
				name,
				render: ({ data }: any) => data[name]?.ItemId?.no,
				minWidth: 180,
				editable: false,
				sortable: false,
				header: (
					<div style={{ width: 80, display: "flex", alignItems: "center" }}>
						<Typography variant="caption">{name}</Typography>
						<Button size="small" onClick={() => handleChangePartName(name)}>
							<EditRounded htmlColor="white" fontSize="small" />
						</Button>
					</div>
				),
			});

			return temp;
		});
		setTableDefaultFilters((prev: any) => {
			const temp = prev?.concat();
			temp.push({ name, operator: "startsWith", type: "string", value: "" });

			return temp;
		});
		setAddPart(false);
	};

	const handleChangePart = (d: ITableChangeRow) => {
		setChanges((prev) => {
			let clone = prev?.concat();
			const index = clone.findIndex((i) => i.device === d.device);

			if (index < 0) {
				clone.push(d);
			} else {
				clone[index].cells = [...clone[index].cells, ...d.cells];
			}

			return clone;
		});

		setChangePart(false);
	};

	const submitChanges = async () => {
		// console.log({ changes });

		try {
			await postMatrixData({ matrice: [...changes] });
			refreshTableData();
			Toast("Submitted", "success");
			setChanges([]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletePart = useCallback(
		(name: string) => {
			const changedRows = tableRows
				.filter((tr) => tr[name])
				.map((tr) => ({
					device: tr.DeviceId,
					cells: tr.parts
						.filter((p: any) => p.name !== name)
						.map((p: any) => ({
							ItemId: p.ItemId._id || p.ItemId.id,
							usage: p.usage || 1,
							name: p.name,
						})),
				}));
			setChanges(changedRows);

			setTableColumns((prev) => prev.filter((c) => c.name !== name));
			setRenamePart(false);
		},
		[tableRows]
	);

	useEffect(() => {
		if (changes.length > 0) {
			window.onbeforeunload = function () {
				return "";
			};
		}

		return () => {
			window.onbeforeunload = null;
		};
	}, [changes.length]);

	if (!tableData || !tableDefaultFilters) {
		return <LinearProgress />;
	}

	return (
		<>
			{selectedPart && (
				<RenamePart
					open={renamePart}
					onClose={() => setRenamePart(false)}
					initialValue={selectedPart}
					onDone={handleRenamePart}
					onDelete={handleDeletePart}
				/>
			)}
			<AddPartModal open={addPart} onClose={() => setAddPart(false)} onDone={handleAddPart} />
			{selectedRowName !== undefined && (
				<ChangePartModal
					open={changePart}
					onClose={() => setChangePart(false)}
					partName={selectedRowName}
					row={selectedRow}
					onDone={handleChangePart}
				/>
			)}

			<Box display="flex" alignItems="flex-top" width="100%">
				<Box width="100%">
					<Button variant="outlined" style={{ margin: "0.5em 0" }} onClick={() => setAddPart(true)}>
						Add part
					</Button>
					<Button
						kind="add"
						disabled={changes.length < 1}
						style={{ margin: "0.5em" }}
						onClick={submitChanges}
					>
						Submit changes
					</Button>

					<Box display="flex" height="70vh">
						<DataGrid
							className={classes.root}
							rowHeight={20}
							columns={tableColumns}
							dataSource={tableRows}
							defaultFilterValue={tableDefaultFilters}
							pagination
							defaultLimit={250}
							// @ts-ignore
							onCellClick={(_, { data, id: partName }) => {
								setSelectedRowName(partName);
								setSelectedRow(data);
								setChangePart(true);
							}}
							pageSizes={[50, 100, 250, 500]}
						/>
					</Box>
				</Box>
			</Box>
		</>
	);
}

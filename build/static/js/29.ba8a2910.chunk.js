(this.webpackJsonpphocus = this.webpackJsonpphocus || []).push([
    [29],
    {
        1397: function (e, t, i) {
            "use strict";
            i.r(t),
                i.d(t, "default", function () {
                    return te;
                });
            var a = i(16),
                r = i(2),
                c = i(0),
                n = i(157),
                s = i(79),
                l = i(338),
                o = i(393),
                d = i(395),
                b = i(238),
                j = i(794),
                x = i(1374),
                u = i(335),
                O = i(1375),
                h = i(391),
                f = i(1376),
                p = i(159),
                m = i(422),
                g = i(807),
                y = i(423),
                v = function () {
                    return Object(r.jsxs)(y.a, {
                        style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)("div", {
                                        style: {
                                            backgroundColor: "#ebefff",
                                            padding: 8,
                                            paddingBottom: 2,
                                            borderRadius: "30%",
                                        },
                                        children: Object(r.jsx)(x.a, { htmlColor: "rgb(43,140,255)" }),
                                    }),
                                    Object(r.jsx)(s.a, {
                                        variant: "h6",
                                        style: { marginLeft: "10px", color: "rgb(33,56,100)" },
                                        children: "Units due date",
                                    }),
                                ],
                            }),
                            Object(r.jsx)(l.a, {
                                children: ["this-week", "week-1", "week-2", "week-3"].map(function (e) {
                                    return Object(r.jsx)(
                                        o.a,
                                        {
                                            style: {
                                                borderLeft: "3px solid rgb(43,140,255)",
                                                paddingBottom: 2,
                                                margin: "4px 0",
                                            },
                                            children: Object(r.jsxs)(d.a, {
                                                style: { borderBottom: "1px solid #f5f5f5" },
                                                children: ["10 units due ", e],
                                            }),
                                        },
                                        e
                                    );
                                }),
                            }),
                        ],
                    });
                },
                w = function () {
                    return Object(r.jsxs)(y.a, {
                        style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                                children: [
                                    Object(r.jsx)("div", {
                                        style: {
                                            backgroundColor: "#ebefff",
                                            padding: 8,
                                            paddingBottom: 2,
                                            borderRadius: "30%",
                                        },
                                        children: Object(r.jsx)(u.a, { htmlColor: "rgb(43,140,255)" }),
                                    }),
                                    Object(r.jsx)(s.a, {
                                        variant: "h6",
                                        style: { marginLeft: "10px", color: "rgb(33,56,100)" },
                                        children: "Search For SO",
                                    }),
                                ],
                            }),
                            Object(r.jsx)("div", { style: { flexGrow: 2 } }),
                            Object(r.jsx)(m.a, {
                                items: ["item1", "item2", "item3"],
                                label: "Type",
                                style: { marginBottom: "10px" },
                                fullWidth: !0,
                            }),
                            Object(r.jsx)(p.c, { label: "Search", placeholder: "Search For", fullWidth: !0 }),
                            Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                        ],
                    });
                },
                S = function () {
                    return Object(r.jsxs)(y.a, {
                        style: { justifyContent: "space-between", boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)(p.a, {
                                        placeholder: "Overdue Services",
                                        type: "text",
                                        value: "",
                                        style: { borderColor: "rgb(206, 212, 218)", width: "50%" },
                                    }),
                                    Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                    Object(r.jsx)(b.a, {
                                        variant: "contained",
                                        color: "primary",
                                        style: { margin: "0 1em" },
                                        children: Object(r.jsx)(O.a, {}),
                                    }),
                                    Object(r.jsx)(b.a, {
                                        variant: "contained",
                                        color: "primary",
                                        children: Object(r.jsx)(h.a, {}),
                                    }),
                                ],
                            }),
                            Object(r.jsx)(g.a, {
                                tableHeads: ["Ship date", "SO no.", "Unit Serial", "Status"],
                                tableRows: [
                                    ["2020-11-14", "1", "1234", "OK"],
                                    ["2020-11-14", "1", "1234", "OK"],
                                ],
                            }),
                        ],
                    });
                },
                k = function () {
                    return Object(r.jsxs)(y.a, {
                        style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)(n.a, {
                                        mr: 2,
                                        display: "flex",
                                        style: { backgroundColor: "#ebefff", padding: 8, borderRadius: "30%" },
                                        children: Object(r.jsx)(f.a, { style: { color: "rgb(43,140,255)" } }),
                                    }),
                                    Object(r.jsx)(s.a, {
                                        variant: "h6",
                                        style: { color: "rgb(33,56,100)" },
                                        children: "Manufacturing",
                                    }),
                                    Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                    Object(r.jsx)(b.a, {
                                        variant: "contained",
                                        color: "primary",
                                        children: "SO Report",
                                    }),
                                ],
                            }),
                            Object(r.jsx)(g.a, {
                                tableHeads: ["Ship date", "Serial no.", "Description", "Status", "Note"],
                                tableRows: [
                                    ["2020-11-14", "1234", "Audi - RS7", "Assembling", "..."],
                                    ["2020-11-14", "1234", "Benz - S500", "Test and Evaluation", "..."],
                                ],
                            }),
                        ],
                    });
                },
                C = function () {
                    return Object(r.jsxs)(y.a, {
                        style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)(n.a, {
                                        mr: 2,
                                        display: "flex",
                                        style: { backgroundColor: "#ebefff", padding: 8, borderRadius: "30%" },
                                        children: Object(r.jsx)(f.a, { style: { color: "rgb(43,140,255)" } }),
                                    }),
                                    Object(r.jsx)(s.a, {
                                        variant: "h6",
                                        style: { color: "rgb(33,56,100)" },
                                        children: "Servicing",
                                    }),
                                    Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                    Object(r.jsx)(b.a, {
                                        variant: "contained",
                                        color: "primary",
                                        children: "Services",
                                    }),
                                ],
                            }),
                            Object(r.jsx)(g.a, {
                                tableHeads: ["Ship date", "Serial no.", "Description", "Assigned", "Status", "Note"],
                                tableRows: [
                                    ["2020-11-14", "1234", "Airbag problem", "Airbag dep", "Maintance", "..."],
                                    ["2020-11-14", "1234", "Airbag problem", "Airbag dep", "Maintance", "..."],
                                ],
                            }),
                        ],
                    });
                };
            function R() {
                return Object(r.jsxs)(j.a, {
                    container: !0,
                    spacing: 4,
                    children: [
                        Object(r.jsx)(j.a, { item: !0, md: 3, sm: 6, children: Object(r.jsx)(v, {}) }),
                        Object(r.jsx)(j.a, { item: !0, md: 6, xs: 12, children: Object(r.jsx)(S, {}) }),
                        Object(r.jsx)(j.a, { item: !0, md: 3, sm: 6, children: Object(r.jsx)(w, {}) }),
                        Object(r.jsx)(j.a, { item: !0, xs: 12, children: Object(r.jsx)(k, {}) }),
                        Object(r.jsx)(j.a, { item: !0, xs: 12, children: Object(r.jsx)(C, {}) }),
                    ],
                });
            }
            var T = i(1377),
                B = i(1378),
                I = i(1379),
                D = function (e) {
                    var t = e.title,
                        i = e.iconBg,
                        a = e.icon,
                        c = e.number,
                        l = e.total,
                        o = e.unit,
                        d = e.discription,
                        b = e.numcolor;
                    return Object(r.jsxs)(y.a, {
                        style: {
                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                        },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    a &&
                                        i &&
                                        Object(r.jsx)(n.a, {
                                            display: "flex",
                                            style: {
                                                backgroundColor: i,
                                                padding: 8,
                                                borderRadius: "30%",
                                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
                                            },
                                            children: a,
                                        }),
                                    Object(r.jsx)(n.a, {
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-around",
                                        children: Object(r.jsxs)(s.a, {
                                            variant: "body1",
                                            style: { color: b, marginLeft: "15px" },
                                            children: [
                                                c,
                                                "/",
                                                l,
                                                " ",
                                                Object(r.jsx)("span", {
                                                    style: { fontSize: 16 },
                                                    children: o || "units",
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            Object(r.jsx)(s.a, {
                                variant: "h5",
                                style: { color: "rgb(33,56,100)", fontWeight: "bold", margin: "1em 0" },
                                children: t,
                            }),
                            Object(r.jsx)(s.a, { variant: "h6", style: { color: "rgb(123,123,123)" }, children: d }),
                        ],
                    });
                },
                H = function (e) {
                    var t = e.title,
                        i = e.tableHeads,
                        a = e.tableRows;
                    return Object(r.jsxs)(y.a, {
                        style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsx)(n.a, {
                                display: "flex",
                                justifyContent: "center",
                                children: Object(r.jsx)(s.a, { children: t }),
                            }),
                            Object(r.jsx)(g.a, { tableHeads: i, tableRows: a }),
                        ],
                    });
                },
                M = function () {
                    return Object(r.jsxs)(y.a, {
                        style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)(s.a, { variant: "h6", children: "Total Shipped" }),
                                    Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                    Object(r.jsx)(n.a, {
                                        display: "flex",
                                        style: { backgroundColor: "#ebefff", padding: 8, borderRadius: 100 },
                                        children: Object(r.jsx)(T.a, { style: { color: "#476bff" } }),
                                    }),
                                ],
                            }),
                            Object(r.jsx)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                                children: Object(r.jsxs)(l.a, {
                                    children: [
                                        Object(r.jsx)(o.a, {
                                            children: Object(r.jsx)(d.a, { children: "1816 Shipped total" }),
                                        }),
                                        Object(r.jsx)(o.a, { children: Object(r.jsx)(d.a, { children: "1 on hold" }) }),
                                        Object(r.jsx)(o.a, {
                                            children: Object(r.jsx)(d.a, { children: "35 Backroder" }),
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    });
                },
                F = function () {
                    return Object(r.jsxs)(j.a, {
                        container: !0,
                        spacing: 2,
                        children: [
                            Object(r.jsxs)("div", {
                                style: { display: "flex", width: "100%", height: "230px" },
                                children: [
                                    Object(r.jsx)("div", {
                                        style: { flexGrow: 1, margin: "10px", width: "22%" },
                                        children: Object(r.jsx)(D, {
                                            title: "Total",
                                            iconBg: "#fff",
                                            number: 50,
                                            total: 70,
                                            numcolor: "rgb(93,210,172)",
                                            discription: "total productions number",
                                            icon: Object(r.jsx)(h.a, { style: { color: "rgb(76,158,255)" } }),
                                        }),
                                    }),
                                    Object(r.jsx)("div", {
                                        style: { flexGrow: 1, margin: "10px", width: "22%" },
                                        children: Object(r.jsx)(D, {
                                            title: "Ready",
                                            iconBg: "#fff",
                                            number: 20,
                                            total: 70,
                                            numcolor: "rgb(231,99,101)",
                                            discription: "total ready to ship number",
                                            icon: Object(r.jsx)(B.a, { style: { color: "rgb(255,194,102)" } }),
                                        }),
                                    }),
                                    Object(r.jsx)("div", {
                                        style: { flexGrow: 1, margin: "10px", width: "22%" },
                                        children: Object(r.jsx)(D, {
                                            title: "Progress",
                                            iconBg: "#fff",
                                            number: 50,
                                            total: 70,
                                            numcolor: "rgb(93,210,172)",
                                            discription: "total in progressing  number",
                                            icon: Object(r.jsx)(I.a, { style: { color: "rgb(38,212,155)" } }),
                                        }),
                                    }),
                                    Object(r.jsx)("div", {
                                        style: { flexGrow: 3, width: "34%", margin: "10px" },
                                        children: Object(r.jsx)(M, {}),
                                    }),
                                ],
                            }),
                            Object(r.jsx)(j.a, {
                                item: !0,
                                md: 6,
                                children: Object(r.jsx)(H, {
                                    title: "Sales Order - In Production",
                                    tableHeads: ["SO date", "SO no.", "Description", "Client", "Price", "Note"],
                                    tableRows: [
                                        ["2020-11-14", "1234", "lorem", "Space x", "1000", "note..."],
                                        ["2020-11-14", "1234", "lorem", "BMW", "1000", "note..."],
                                    ],
                                }),
                            }),
                            Object(r.jsx)(j.a, {
                                item: !0,
                                md: 6,
                                children: Object(r.jsx)(H, {
                                    title: "Sales Order - Ready To Ship",
                                    tableHeads: ["SO date", "SO no.", "Description", "Client", "Price", "Note"],
                                    tableRows: [
                                        ["2020-11-14", "1234", "lorem", "Space x", "1000", "note..."],
                                        ["2020-11-14", "1234", "lorem", "BMW", "1000", "note..."],
                                    ],
                                }),
                            }),
                            Object(r.jsx)(j.a, {
                                item: !0,
                                md: 6,
                                children: Object(r.jsx)(H, {
                                    title: "Shipments - In Progress",
                                    tableHeads: [
                                        "Ship date",
                                        "Ship no.",
                                        "Expiration Date",
                                        "Client",
                                        "Status",
                                        "Description",
                                    ],
                                    tableRows: [
                                        ["2020-11-14", "1234", "2020-12-20", "Benz", "Packing", "..."],
                                        ["2020-11-14", "1234", "2020-12-20", "Uber", "Maintance", "..."],
                                    ],
                                }),
                            }),
                            Object(r.jsx)(j.a, {
                                item: !0,
                                md: 6,
                                children: Object(r.jsx)(H, {
                                    title: "Shipments - Shipped",
                                    tableHeads: [
                                        "Ship date",
                                        "Ship no.",
                                        "Expiration Date",
                                        "Client",
                                        "Status",
                                        "Description",
                                    ],
                                    tableRows: [
                                        ["2020-11-14", "1234", "2020-12-20", "Benz", "Packing", "..."],
                                        ["2020-11-14", "1234", "2020-12-20", "Uber", "Maintance", "..."],
                                    ],
                                }),
                            }),
                        ],
                    });
                },
                G = i(354),
                A = i(402),
                E = i(1380),
                W = i(89),
                L = i(182),
                P = i(894),
                z = i.p + "static/media/person.3d09b843.svg",
                K = i.p + "static/media/chat.914781d1.svg",
                N = i.p + "static/media/activity.aab61018.svg",
                V = i.p + "static/media/quote.1ebbff32.svg",
                q = i.p + "static/media/speaker.c493920f.svg",
                U = i.p + "static/media/badge.52bf0b2f.svg",
                Q = Object(G.a)({
                    statusCard: {
                        boxShadow: "  7px 7px 14px #bebebe, -7px -7px 14px #ffffff",
                        "&:hover": { boxShadow: " 20px 20px 60px #bebebe, -20px -20px 60px #ffffff" },
                    },
                }),
                J = function (e) {
                    var t = e.title,
                        i = e.value,
                        a = e.icon,
                        c = e.children,
                        l = Q();
                    return Object(r.jsx)(n.a, {
                        m: 1,
                        display: "inline-flex",
                        flex: 1,
                        height: 90,
                        children: Object(r.jsx)(y.a, {
                            title: "title",
                            style: { width: "100%", boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -10px" },
                            className: l.statusCard,
                            children: Object(r.jsxs)(n.a, {
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)(n.a, {
                                        children: Object(r.jsx)("img", {
                                            style: { backgroundColor: "#f7f7fc", borderRadius: 200, padding: 8 },
                                            src: a,
                                            alt: t,
                                        }),
                                    }),
                                    Object(r.jsxs)(n.a, {
                                        flex: 2,
                                        ml: 1,
                                        style: { marginRight: "auto" },
                                        children: [
                                            Object(r.jsx)(s.a, { variant: "body1", children: i }),
                                            Object(r.jsx)(s.a, { variant: "caption", children: t }),
                                        ],
                                    }),
                                    c,
                                ],
                            }),
                        }),
                    });
                },
                $ = function () {
                    var e = Object(L.b)("/activity").data;
                    return e
                        ? Object(r.jsxs)(y.a, {
                              children: [
                                  Object(r.jsxs)(n.a, {
                                      display: "flex",
                                      alignItems: "center",
                                      children: [
                                          Object(r.jsx)(s.a, { variant: "h6", children: "Activities" }),
                                          Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                          Object(r.jsxs)(n.a, {
                                              children: [
                                                  Object(r.jsx)(b.a, { children: "Today" }),
                                                  Object(r.jsx)(b.a, { children: "This Week" }),
                                                  Object(r.jsx)(b.a, { children: "This Month" }),
                                              ],
                                          }),
                                          Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                          Object(r.jsx)(W.b, {
                                              to: "/activity",
                                              children: Object(r.jsx)(b.a, {
                                                  variant: "contained",
                                                  color: "primary",
                                                  children: Object(r.jsx)(E.a, {}),
                                              }),
                                          }),
                                      ],
                                  }),
                                  Object(r.jsx)(g.b, {
                                      cols: [
                                          { field: "name" },
                                          { field: "subject" },
                                          { field: "startTime" },
                                          { field: "endTime" },
                                      ],
                                      rows: e,
                                  }),
                              ],
                          })
                        : Object(r.jsx)(A.a, {});
                },
                X = function () {
                    var e = Object(L.b)("/quote").data;
                    return e
                        ? Object(r.jsxs)(y.a, {
                              children: [
                                  Object(r.jsxs)(n.a, {
                                      display: "flex",
                                      alignItems: "center",
                                      children: [
                                          Object(r.jsx)(s.a, { variant: "h6", children: "Quotes" }),
                                          Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                          Object(r.jsx)(W.b, {
                                              to: "/sales",
                                              children: Object(r.jsx)(b.a, {
                                                  variant: "contained",
                                                  color: "primary",
                                                  children: Object(r.jsx)(E.a, {}),
                                              }),
                                          }),
                                      ],
                                  }),
                                  Object(r.jsx)(g.b, { cols: [{ field: "number" }, { field: "expireDate" }], rows: e }),
                              ],
                          })
                        : Object(r.jsx)(A.a, {});
                },
                Y = function () {
                    return Object(r.jsxs)(y.a, {
                        children: [
                            Object(r.jsxs)(n.a, {
                                display: "flex",
                                alignItems: "center",
                                children: [
                                    Object(r.jsx)(s.a, { variant: "h6", children: "Emails" }),
                                    Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                    Object(r.jsx)(b.a, {
                                        variant: "contained",
                                        color: "primary",
                                        children: Object(r.jsx)(E.a, {}),
                                    }),
                                ],
                            }),
                            Object(r.jsx)(g.a, {
                                tableHeads: ["Contract device", "Expiring Date"],
                                tableRows: [
                                    ["Test", "2020-11-14"],
                                    ["Test", "2020-11-14"],
                                ],
                            }),
                        ],
                    });
                },
                Z = function () {
                    var e = Object(L.b)("/so").data;
                    return e
                        ? Object(r.jsxs)(y.a, {
                              children: [
                                  Object(r.jsxs)(n.a, {
                                      display: "flex",
                                      alignItems: "center",
                                      children: [
                                          Object(r.jsx)(s.a, { variant: "h6", children: "Sales Orders" }),
                                          Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                      ],
                                  }),
                                  Object(r.jsx)(g.b, {
                                      cols: [{ field: "number" }, { field: "estShipDate" }, { field: "actShipDate" }],
                                      rows: e,
                                  }),
                              ],
                          })
                        : Object(r.jsx)(A.a, {});
                },
                _ = function () {
                    var e = Object(L.b)("/quote").data,
                        t = Object(L.b)("/activity").data,
                        i = Object(L.b)("/so").data,
                        a = Object(L.b)("/po").data;
                    return Object(r.jsxs)(j.a, {
                        container: !0,
                        spacing: 2,
                        children: [
                            Object(r.jsxs)(j.a, {
                                item: !0,
                                md: 8,
                                children: [
                                    Object(r.jsxs)(n.a, {
                                        display: "flex",
                                        children: [
                                            Object(r.jsx)(J, {
                                                icon: V,
                                                title: "Quotes",
                                                value: e ? e.length : 0,
                                                children: Object(r.jsx)("div", {
                                                    style: { padding: "0.5em" },
                                                    children: Object(r.jsx)(P.a, {
                                                        data: [
                                                            { date: "2021-03-2", count: 10 },
                                                            { date: "2021-03-7", count: 5 },
                                                            { date: "2021-03-10", count: 16 },
                                                        ],
                                                        xDataKey: "date",
                                                        barDataKey: "count",
                                                    }),
                                                }),
                                            }),
                                            Object(r.jsx)(J, {
                                                icon: K,
                                                title: "Purchase orders",
                                                value: a ? a.length : 0,
                                            }),
                                            Object(r.jsx)(J, {
                                                icon: N,
                                                title: "Sales Orders",
                                                value: i ? i.length : 0,
                                            }),
                                        ],
                                    }),
                                    Object(r.jsxs)(n.a, {
                                        display: "flex",
                                        children: [
                                            Object(r.jsx)(J, { icon: z, title: "Activities", value: t ? t.length : 0 }),
                                            Object(r.jsx)(J, { icon: q, title: "Expiring waranties", value: "2899" }),
                                            Object(r.jsx)(J, { icon: U, title: "Shippings", value: "2899" }),
                                        ],
                                    }),
                                ],
                            }),
                            Object(r.jsx)(j.a, { item: !0, md: 4, children: Object(r.jsx)(X, {}) }),
                            Object(r.jsx)(j.a, { item: !0, md: 8, children: Object(r.jsx)($, {}) }),
                            Object(r.jsx)(j.a, { item: !0, md: 4, children: Object(r.jsx)(Y, {}) }),
                            Object(r.jsx)(j.a, { item: !0, md: 8, children: Object(r.jsx)(Z, {}) }),
                            Object(r.jsx)(j.a, {
                                item: !0,
                                md: 4,
                                children: Object(r.jsxs)(y.a, {
                                    children: [
                                        Object(r.jsx)(s.a, {
                                            style: { margin: 4, textAlign: "center" },
                                            children: "Expiring Waranties",
                                        }),
                                        Object(r.jsx)(g.a, {
                                            tableHeads: ["Contract device", "Expiring Date"],
                                            tableRows: [
                                                ["Test", "2020-11-14"],
                                                ["Test", "2020-11-14"],
                                            ],
                                        }),
                                    ],
                                }),
                            }),
                        ],
                    });
                },
                ee = i(585);
            i(940);
            function te() {
                var e = Object(c.useState)(0),
                    t = Object(a.a)(e, 2),
                    i = t[0],
                    s = t[1];
                return Object(r.jsxs)(r.Fragment, {
                    children: [
                        Object(r.jsxs)(n.a, {
                            display: "flex",
                            alignItems: "center",
                            style: { margin: "1em 0" },
                            children: [
                                Object(r.jsx)(p.b, {}),
                                Object(r.jsx)("div", { style: { flexGrow: 1 } }),
                                Object(r.jsxs)(ee.b, {
                                    value: i,
                                    onChange: function (e, t) {
                                        return s(t);
                                    },
                                    style: { height: "40px" },
                                    children: [
                                        Object(r.jsx)(ee.a, { label: "Quote" }),
                                        Object(r.jsx)(ee.a, { label: "Sales" }),
                                        Object(r.jsx)(ee.a, { label: "Ship" }),
                                    ],
                                }),
                            ],
                        }),
                        0 === i && Object(r.jsx)(R, {}),
                        1 === i && Object(r.jsx)(_, {}),
                        2 === i && Object(r.jsx)(F, {}),
                    ],
                });
            }
        },
        422: function (e, t, i) {
            "use strict";
            i.d(t, "d", function () {
                return b;
            }),
                i.d(t, "c", function () {
                    return x;
                }),
                i.d(t, "a", function () {
                    return u;
                }),
                i.d(t, "b", function () {
                    return O;
                });
            var a = i(15),
                r = i(16),
                c = i(3),
                n = i(2),
                s = i(0),
                l = i(1373),
                o = i(159),
                d = i(1403),
                b = function (e) {
                    var t = e.request,
                        i = e.limit,
                        l = e.getOptionLabel,
                        b = e.getOptionValue,
                        j = e.onChange,
                        x = e.value,
                        u = Object(c.a)(e, [
                            "request",
                            "limit",
                            "getOptionLabel",
                            "getOptionValue",
                            "onChange",
                            "value",
                        ]),
                        O = Object(s.useState)([]),
                        h = Object(r.a)(O, 2),
                        f = h[0],
                        p = h[1],
                        m = Object(s.useState)(),
                        g = Object(r.a)(m, 2),
                        y = g[0],
                        v = g[1];
                    return (
                        Object(s.useEffect)(
                            function () {
                                var e = f.find(function (e) {
                                    return b(e) === x;
                                });
                                v(e);
                            },
                            [x, f, b]
                        ),
                        Object(s.useEffect)(
                            function () {
                                t()
                                    .then(function (e) {
                                        p(i && i > 0 ? e.slice(0, i) : e);
                                    })
                                    .catch(function (e) {
                                        return console.log(e);
                                    });
                            },
                            [i, t]
                        ),
                        Object(n.jsx)(d.a, {
                            style: u.style,
                            getOptionLabel: l,
                            options: f,
                            onChange: j,
                            onBlur: u.onBlur,
                            value: y,
                            renderInput: function (e) {
                                return Object(n.jsx)(
                                    o.c,
                                    Object(a.a)(
                                        Object(a.a)({}, e),
                                        {},
                                        {
                                            label: null === u || void 0 === u ? void 0 : u.label,
                                            error: u.error,
                                            placeholder: u.placeholder,
                                        }
                                    )
                                );
                            },
                        })
                    );
                },
                j = function (e) {
                    e.inputStyle;
                    var t = e.items,
                        i = e.itemTitleField,
                        r = e.itemValueField,
                        s = e.keyField,
                        d = Object(c.a)(e, ["inputStyle", "items", "itemTitleField", "itemValueField", "keyField"]);
                    return Object(n.jsxs)(
                        o.c,
                        Object(a.a)(
                            Object(a.a)({}, d),
                            {},
                            {
                                select: !0,
                                style: Object(a.a)(Object(a.a)({}, d.style), {}, { fontSize: "0.8rem" }),
                                children: [
                                    Object(n.jsx)(l.a, { value: void 0, children: "None" }),
                                    t &&
                                        t.length >= 0 &&
                                        t.map(function (e, t) {
                                            return Object(n.jsx)(l.a, { value: e[r], children: e[i] }, s ? e[s] : t);
                                        }),
                                ],
                            }
                        )
                    );
                },
                x = function (e) {
                    e.keyField;
                    var t = e.request,
                        i = e.itemValueField,
                        l = e.itemTitleField,
                        o = e.limit,
                        d = e.getOptionList,
                        b = Object(c.a)(e, [
                            "keyField",
                            "request",
                            "itemValueField",
                            "itemTitleField",
                            "limit",
                            "getOptionList",
                        ]),
                        x = Object(s.useState)([]),
                        u = Object(r.a)(x, 2),
                        O = u[0],
                        h = u[1];
                    return (
                        Object(s.useEffect)(
                            function () {
                                t()
                                    .then(function (e) {
                                        if (o && o > 0) {
                                            var t = d ? d(e) : e.slice(0, o);
                                            h(t);
                                        } else {
                                            var i = d ? d(e) : e;
                                            h(i);
                                        }
                                    })
                                    .catch(function (e) {
                                        return console.log(e);
                                    });
                            },
                            [d, o, t]
                        ),
                        Object(n.jsx)(
                            j,
                            Object(a.a)(Object(a.a)({}, b), {}, { itemTitleField: l, itemValueField: i, items: O })
                        )
                    );
                },
                u = function (e) {
                    var t = e.items,
                        i = Object(c.a)(e, ["items"]);
                    return Object(n.jsx)(
                        j,
                        Object(a.a)(
                            {
                                itemTitleField: "item",
                                itemValueField: "item",
                                items: t
                                    ? t.map(function (e) {
                                          return { item: e };
                                      })
                                    : [],
                            },
                            i
                        )
                    );
                },
                O = function (e) {
                    return Object(n.jsx)(
                        o.c,
                        Object(a.a)(Object(a.a)({}, e), {}, { select: !0, children: e.children })
                    );
                };
        },
        423: function (e, t, i) {
            "use strict";
            i.d(t, "a", function () {
                return s;
            }),
                i.d(t, "b", function () {
                    return l;
                });
            var a = i(15),
                r = i(2),
                c = (i(0), i(7)),
                n = i(180),
                s = Object(c.a)(function (e) {
                    return { root: { borderRadius: 10, padding: "1em" } };
                })(function (e) {
                    return Object(r.jsx)(n.a, Object(a.a)({ elevation: 3 }, e));
                }),
                l = Object(c.a)(function (e) {
                    return {
                        root: {
                            borderRadius: 10,
                            padding: e.spacing(4),
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                        },
                    };
                })(function (e) {
                    return Object(r.jsx)(n.a, Object(a.a)(Object(a.a)({}, e), {}, { elevation: 5 }));
                });
        },
        585: function (e, t, i) {
            "use strict";
            i.d(t, "b", function () {
                return d;
            }),
                i.d(t, "a", function () {
                    return b;
                });
            var a = i(15),
                r = i(2),
                c = (i(0), i(7)),
                n = i(1400),
                s = i(248),
                l = i(1381),
                o = i.p + "static/media/tabBG.426fa8f4.png",
                d = Object(c.a)({
                    root: {
                        minHeight: "45px",
                        border: "1px solid #848484",
                        borderRadius: "0.5em",
                        backgroundImage: "url(".concat(o, ")"),
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    },
                    indicator: { backgroundColor: "#ccc", height: 0 },
                    vertical: {
                        textAlign: "left",
                        width: "125px",
                        backgroundImage: "url(".concat(o, ")"),
                        backgroundColor: "black",
                        height: "85vh",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        paddingTop: "30px",
                        "& .MuiTabs-indicator": { backgroundColor: "rgb(230,128,49)" },
                    },
                })(n.a),
                b = Object(c.a)(function (e) {
                    return Object(s.a)({
                        root: {
                            textAlign: "left",
                            textTransform: "none",
                            minWidth: "2em",
                            minHeight: "45px",
                            color: "white",
                            marginRight: "auto",
                            "& .MuiTab-wrapper": { alignItems: "normal" },
                            "&:hover": { color: "#aaa", opacity: 1 },
                            "&$selected": {
                                backgroundColor: "rgb(42,49,59)",
                                borderRadius: "0.5em",
                                color: "rgb(230,128,49)",
                            },
                            "&:active": { borderRadius: "0.5em", color: "rgb(230,128,49)" },
                            "&:focus": { borderRadius: "0.5em", color: "rgb(230,128,49)" },
                        },
                        selected: {},
                    });
                })(function (e) {
                    return Object(r.jsx)(l.a, Object(a.a)({ disableRipple: !0 }, e));
                });
        },
        807: function (e, t, i) {
            "use strict";
            i.d(t, "c", function () {
                return b;
            }),
                i.d(t, "b", function () {
                    return j;
                }),
                i.d(t, "a", function () {
                    return x;
                });
            var a = i(2),
                r = (i(0), i(354)),
                c = i(815),
                n = i(816),
                s = i(817),
                l = i(818),
                o = i(1053),
                d = i(819),
                b =
                    (i(157),
                    i(79),
                    Object(r.a)(function (e) {
                        return {
                            tableCont: { borderRadius: 10, maxHeight: 550 },
                            root: {
                                backgroundColor: "#f9f9f9",
                                border: "none",
                                borderRadius: 15,
                                "& .MuiTableHead-root": { position: ["sticky", "-webkit-sticky"], top: 0 },
                                "& .MuiTableRow-head, .MuiTableCell-stickyHeader": { backgroundColor: "#202731" },
                                "& .MuiTableCell-head": {
                                    cursor: "pointer",
                                    color: "#fff",
                                    border: "1px solid #333b44",
                                },
                                "& .MuiTableSortLabel-icon ": { fill: "white" },
                                "& .MuiTableCell-head:hover": { backgroundColor: "#333b44" },
                                "& tbody .MuiTableCell-root": { border: "1px solid #dddddd", fontSize: "0.700rem" },
                                "& .MuiButton-root": { fontSize: "0.700rem" },
                                "& tbody tr:hover": { backgroundColor: "#f3f3f3", cursor: "pointer" },
                                "& .Mui-selected": {
                                    boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                    backgroundColor: "#fff !important",
                                },
                                "& .MuiDataGrid-sortIcon": { fill: "white" },
                            },
                            tableHeadBtn: { color: "white", padding: 0 },
                        };
                    })),
                j = function (e) {
                    var t = e.cols;
                    e.rows;
                    return Object(a.jsx)(c.a, {
                        style: { maxHeight: 280, overflow: "auto" },
                        children: Object(a.jsxs)(n.a, {
                            style: { background: "#f1f1f1", margin: "1em 0", borderRadius: 10 },
                            children: [
                                Object(a.jsx)(s.a, {
                                    style: { backgroundColor: "#e9e9e9", margin: "1em", borderRadius: 20 },
                                    children: Object(a.jsx)(l.a, {
                                        children: t.map(function (e) {
                                            return Object(a.jsx)(
                                                o.a,
                                                {
                                                    style: { fontWeight: "bold" },
                                                    children: e.headerName ? e.headerName : e.field,
                                                },
                                                e.field
                                            );
                                        }),
                                    }),
                                }),
                                Object(a.jsx)(d.a, { style: { borderBottom: "none" } }),
                            ],
                        }),
                    });
                },
                x = function (e) {
                    var t = e.tableHeads,
                        i = e.tableRows;
                    return Object(a.jsx)(c.a, {
                        style: { maxHeight: 280, overflow: "auto" },
                        children: Object(a.jsxs)(n.a, {
                            style: { background: "#f1f1f1", margin: "1em 0", borderRadius: 10 },
                            children: [
                                Object(a.jsx)(s.a, {
                                    style: { backgroundColor: "#e9e9e9", margin: "1em", borderRadius: 20 },
                                    children: Object(a.jsx)(l.a, {
                                        children: t.map(function (e) {
                                            return Object(a.jsx)(
                                                o.a,
                                                { style: { fontWeight: "bold" }, children: e },
                                                e
                                            );
                                        }),
                                    }),
                                }),
                                Object(a.jsx)(d.a, {
                                    style: { borderBottom: "none" },
                                    children: i.map(function (e, t) {
                                        return Object(a.jsx)(
                                            l.a,
                                            {
                                                style: { borderBottom: "none" },
                                                children: e.map(function (e) {
                                                    return Object(a.jsx)(
                                                        o.a,
                                                        { style: { borderBottom: "none" }, children: e },
                                                        e
                                                    );
                                                }),
                                            },
                                            t
                                        );
                                    }),
                                }),
                            ],
                        }),
                    });
                };
        },
        894: function (e, t, i) {
            "use strict";
            i.d(t, "a", function () {
                return b;
            });
            var a = i(2),
                r = (i(0), i(892)),
                c = i(895),
                n = i(783),
                s = i(784),
                l = i(792),
                o = i(586),
                d = i(799);
            function b(e) {
                var t = e.data,
                    i = e.xDataKey,
                    b = e.barDataKey,
                    j = e.height;
                return Object(a.jsx)("div", {
                    style: { width: "100%", height: j || 400, display: "flex", justifyContent: "center" },
                    children: Object(a.jsx)(r.a, {
                        width: "100%",
                        height: "100%",
                        children: Object(a.jsxs)(c.a, {
                            width: 300,
                            height: 100,
                            data: t,
                            children: [
                                Object(a.jsx)(n.a, { dataKey: i }),
                                Object(a.jsx)(s.a, {}),
                                Object(a.jsx)(l.a, {}),
                                Object(a.jsx)(o.a, {}),
                                Object(a.jsx)(d.a, { type: "monotone", dataKey: b, stroke: "#ffa726", strokeWidth: 2 }),
                            ],
                        }),
                    }),
                });
            }
        },
        940: function (e, t, i) {},
    },
]);
//# sourceMappingURL=29.ba8a2910.chunk.js.map

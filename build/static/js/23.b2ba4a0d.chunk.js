(this.webpackJsonpphocus = this.webpackJsonpphocus || []).push([
    [23, 5],
    {
        1065: function (e, t, n) {
            "use strict";
            var a = n(0),
                r = n.n(a),
                c = n(21);
            t.a = Object(c.a)(
                r.a.createElement("path", {
                    d: "M15.88 9.29L12 13.17 8.12 9.29a.9959.9959 0 00-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0z",
                }),
                "ExpandMoreRounded"
            );
        },
        1402: function (e, t, n) {
            "use strict";
            n.r(t),
                n.d(t, "default", function () {
                    return ee;
                });
            var a = n(31),
                r = n.n(a),
                c = n(65),
                i = n(16),
                o = n(2),
                l = n(0),
                s = n(157),
                u = n(393),
                d = n(237),
                b = n(820),
                f = n.n(b),
                j = n(834),
                m = n.n(j),
                p = n(952),
                h = n.n(p),
                O = n(606),
                x = n(509),
                v = n(414),
                g = n(421),
                y = n(585),
                C = n(598),
                w = n(457),
                k = n(184),
                E = n(525),
                S = n(459),
                R = n(1400),
                I = n(1381),
                B = n(87),
                T = n(80),
                D = n(384),
                N = n(408),
                F = n(159),
                A = n(422),
                M = n(587),
                L = n(533),
                V = n(612),
                z = n(164),
                q = n(597),
                H = n(903),
                P = n(20),
                W = n(423),
                $ = T.c().shape({ name: T.d().required() });
            function G(e) {
                var t = e.open,
                    n = e.init,
                    a = e.onDone,
                    i = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e(t, c) {
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (
                                                        (c.setSubmitting,
                                                        (e.prev = 1),
                                                        !n || !(null === n || void 0 === n ? void 0 : n.id))
                                                    ) {
                                                        e.next = 9;
                                                        break;
                                                    }
                                                    return (e.next = 5), Object(H.e)(n.id, t);
                                                case 5:
                                                    e.sent && a(), (e.next = 13);
                                                    break;
                                                case 9:
                                                    return (e.next = 11), Object(H.a)(t);
                                                case 11:
                                                    e.sent && a();
                                                case 13:
                                                    e.next = 18;
                                                    break;
                                                case 15:
                                                    (e.prev = 15), (e.t0 = e.catch(1)), console.log(e.t0);
                                                case 18:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[1, 15]]
                                );
                            })
                        );
                        return function (t, n) {
                            return e.apply(this, arguments);
                        };
                    })();
                return Object(o.jsx)(B.b, {
                    initialValues: n,
                    validationSchema: $,
                    onSubmit: i,
                    children: function (e) {
                        var n = e.values,
                            a = e.errors,
                            r = e.touched,
                            c = e.handleChange,
                            i = e.handleBlur;
                        return Object(o.jsx)(B.a, {
                            children: Object(o.jsxs)(s.a, {
                                display: "flex",
                                children: [
                                    Object(o.jsx)(W.a, {
                                        style: { marginRight: "1em" },
                                        children: Object(o.jsxs)(s.a, {
                                            flex: 3,
                                            children: [
                                                Object(o.jsxs)(s.a, {
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    my: 1,
                                                    children: [
                                                        Object(o.jsx)(F.c, {
                                                            error: Boolean(a.name && r.name),
                                                            name: "name",
                                                            label: "name",
                                                            value: n.name,
                                                            onChange: c,
                                                            onBlur: i,
                                                            style: { flex: "1 1 25%" },
                                                        }),
                                                        Object(o.jsx)(F.c, {
                                                            style: { flex: "1 1 25%", marginRight: 5, marginLeft: 5 },
                                                            name: "subject",
                                                            label: "subject",
                                                            value: n.subject,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(F.c, {
                                                            style: { flex: "1 1 25%", marginRight: 5 },
                                                            name: "location",
                                                            label: "location",
                                                            value: n.location,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(F.c, {
                                                            name: "notes",
                                                            label: "notes",
                                                            value: n.notes,
                                                            onChange: c,
                                                            onBlur: i,
                                                            style: { flex: "1 1 25%" },
                                                        }),
                                                    ],
                                                }),
                                                Object(o.jsxs)(s.a, {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    my: 1,
                                                    children: [
                                                        Object(o.jsx)(F.c, {
                                                            style: { flex: "1 1 25%" },
                                                            type: "date",
                                                            name: "startTime",
                                                            label: "Start time",
                                                            value: n.startTime ? n.startTime.substr(0, 10) : "",
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(F.c, {
                                                            style: { marginRight: 5, marginLeft: 5, flex: "1 1 25%" },
                                                            type: "date",
                                                            name: "endTime",
                                                            label: "End time",
                                                            value: n.endTime ? n.endTime.substr(0, 10) : "",
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(A.c, {
                                                            style: { flex: "1 1 25%", marginRight: 5 },
                                                            request: M.d,
                                                            itemTitleField: "name",
                                                            itemValueField: "id",
                                                            label: "Client",
                                                            name: "ClientId",
                                                            value: n.ClientId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(A.c, {
                                                            style: { flex: "1 1 25%" },
                                                            label: "Contact",
                                                            name: "ContactId",
                                                            request: L.d,
                                                            itemTitleField: "lastName",
                                                            itemValueField: "id",
                                                            value: n.ContactId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                    ],
                                                }),
                                                Object(o.jsxs)(s.a, {
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    my: 1,
                                                    children: [
                                                        Object(o.jsx)(A.c, {
                                                            style: { flex: "1 1 25%" },
                                                            label: "ActivityPriorityId",
                                                            name: "ActivityPriorityId",
                                                            request: function () {
                                                                return Object(P.c)("/activitypriority");
                                                            },
                                                            itemTitleField: "name",
                                                            itemValueField: "id",
                                                            value: n.ActivityPriorityId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(A.c, {
                                                            style: { flex: "1 1 25%", marginRight: 5, marginLeft: 5 },
                                                            label: "Project",
                                                            name: "ProjectId",
                                                            request: V.c,
                                                            itemTitleField: "name",
                                                            itemValueField: "id",
                                                            value: n.ProjectId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(A.c, {
                                                            style: { flex: "1 1 25%", marginRight: 5 },
                                                            label: "Employee",
                                                            name: "EmployeeId",
                                                            request: z.e,
                                                            itemTitleField: "username",
                                                            itemValueField: "id",
                                                            value: n.EmployeeId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                        Object(o.jsx)(A.c, {
                                                            style: { flex: "1 1 25%" },
                                                            label: "Quote",
                                                            name: "QuoteId",
                                                            request: q.e,
                                                            itemTitleField: "number",
                                                            itemValueField: "id",
                                                            value: n.QuoteId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                    ],
                                                }),
                                                Object(o.jsxs)(s.a, {
                                                    display: "flex",
                                                    my: 1,
                                                    children: [
                                                        Object(o.jsx)(A.c, {
                                                            label: "ActivityCategoryId",
                                                            name: "ActivityCategoryId",
                                                            request: function () {
                                                                return Object(P.c)("/activitycategory");
                                                            },
                                                            itemTitleField: "name",
                                                            itemValueField: "id",
                                                            value: n.ActivityCategoryId,
                                                            onChange: c,
                                                            onBlur: i,
                                                            style: { marginRight: 5 },
                                                        }),
                                                        Object(o.jsx)(A.c, {
                                                            label: "ActivityStatusId",
                                                            name: "ActivityStatusId",
                                                            request: function () {
                                                                return Object(P.c)("/activitystatus");
                                                            },
                                                            itemTitleField: "name",
                                                            itemValueField: "id",
                                                            value: n.ActivityStatusId,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    }),
                                    Object(o.jsx)(W.a, {
                                        style: {
                                            height: "100%",
                                            minHeight: "350px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-evenly",
                                        },
                                        children: Object(o.jsxs)(s.a, {
                                            flex: 1,
                                            children: [
                                                Object(o.jsxs)(s.a, {
                                                    children: [
                                                        Object(o.jsxs)("div", {
                                                            children: [
                                                                Object(o.jsx)(D.a, {
                                                                    name: "allDayActivity",
                                                                    control: Object(o.jsx)(N.a, {}),
                                                                    label: "All dat activity",
                                                                    checked: n.allDayActivity,
                                                                    onChange: c,
                                                                    onBlur: i,
                                                                }),
                                                                Object(o.jsx)(D.a, {
                                                                    name: "notifyOnDay",
                                                                    control: Object(o.jsx)(N.a, {}),
                                                                    label: "Notify on day",
                                                                    checked: n.notifyOnDay,
                                                                    onChange: c,
                                                                    onBlur: i,
                                                                }),
                                                            ],
                                                        }),
                                                        Object(o.jsxs)("div", {
                                                            children: [
                                                                Object(o.jsx)(D.a, {
                                                                    name: "recurring",
                                                                    control: Object(o.jsx)(N.a, {}),
                                                                    label: "Recurring",
                                                                    checked: n.recurring,
                                                                    onChange: c,
                                                                    onBlur: i,
                                                                }),
                                                                Object(o.jsx)(D.a, {
                                                                    name: "notifyNow",
                                                                    control: Object(o.jsx)(N.a, {}),
                                                                    label: "Notify now",
                                                                    checked: n.notifyNow,
                                                                    onChange: c,
                                                                    onBlur: i,
                                                                }),
                                                            ],
                                                        }),
                                                        Object(o.jsx)(D.a, {
                                                            name: "doNotShowOnCalendar",
                                                            control: Object(o.jsx)(N.a, {}),
                                                            label: "Do not show on calendar",
                                                            checked: n.doNotShowOnCalendar,
                                                            onChange: c,
                                                            onBlur: i,
                                                        }),
                                                    ],
                                                }),
                                                Object(o.jsx)(s.a, {
                                                    my: 4,
                                                    children: Object(o.jsx)("div", {
                                                        style: {
                                                            display: "flex",
                                                            width: "100%",
                                                            alignItems: "flex-end",
                                                            marginTop: "auto",
                                                        },
                                                        children: Object(o.jsx)(v.a, {
                                                            kind: "add",
                                                            type: "submit",
                                                            style: { flex: 1 },
                                                            children: t ? "Add" : "Save",
                                                        }),
                                                    }),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                        });
                    },
                });
            }
            var _ = n(424),
                Q = n(512);
            function J(e) {
                var t = e.selectedActivity,
                    n = e.onDone,
                    a = e.notes,
                    r = e.docs,
                    c = e.onNoteSelected,
                    u = e.onDocSelected,
                    d = Object(l.useState)(0),
                    b = Object(i.a)(d, 2),
                    f = b[0],
                    j = b[1],
                    m = Object(l.useMemo)(function () {
                        return [
                            {
                                field: "date",
                                headerName: "Date",
                                valueFormatter: function (e) {
                                    var t;
                                    return Object(_.a)(null === (t = e.row) || void 0 === t ? void 0 : t.date);
                                },
                                width: 120,
                            },
                            {
                                field: "creator",
                                headerName: "Creator",
                                width: 180,
                                valueFormatter: function (e) {
                                    var t, n;
                                    return null === (t = e.row) ||
                                        void 0 === t ||
                                        null === (n = t.EmployeeId) ||
                                        void 0 === n
                                        ? void 0
                                        : n.username;
                                },
                            },
                            { field: "subject", headerName: "Subject", width: 300 },
                            { field: "note", headerName: "Note", flex: 1 },
                        ];
                    }, []),
                    p = Object(l.useMemo)(function () {
                        return [
                            {
                                field: "date",
                                headerName: "Date",
                                valueFormatter: function (e) {
                                    var t;
                                    return Object(_.a)(null === (t = e.row) || void 0 === t ? void 0 : t.date);
                                },
                                width: 120,
                            },
                            {
                                field: "EmployeeId",
                                headerName: "Creator",
                                valueFormatter: function (e) {
                                    var t, n;
                                    return null === (t = e.row) ||
                                        void 0 === t ||
                                        null === (n = t.employee) ||
                                        void 0 === n
                                        ? void 0
                                        : n.username;
                                },
                                width: 120,
                            },
                            { field: "name", headerName: "Name", flex: 1 },
                            { field: "id", headerName: "ID", width: 200 },
                            { field: "description", headerName: "Description", flex: 1 },
                            {
                                field: "type",
                                headerName: "File Type",
                                valueFormatter: function (e) {
                                    var t;
                                    return Object(Q.a)(null === (t = e.row) || void 0 === t ? void 0 : t.path);
                                },
                                width: 120,
                            },
                        ];
                    }, []);
                return Object(o.jsxs)(s.a, {
                    children: [
                        Object(o.jsx)(G, { init: t, onDone: n }),
                        Object(o.jsx)(W.a, {
                            style: { marginTop: "1em" },
                            children: Object(o.jsxs)(s.a, {
                                children: [
                                    Object(o.jsxs)(R.a, {
                                        style: { marginBottom: 10 },
                                        value: f,
                                        textColor: "primary",
                                        onChange: function (e, t) {
                                            return j(t);
                                        },
                                        children: [
                                            Object(o.jsx)(I.a, { label: "Notes" }),
                                            Object(o.jsx)(I.a, { label: "Documents" }),
                                        ],
                                    }),
                                    0 === f && Object(o.jsx)(g.b, { cols: m, rows: a, onRowSelected: c, height: 250 }),
                                    1 === f && Object(o.jsx)(g.b, { cols: p, rows: r, onRowSelected: u, height: 250 }),
                                ],
                            }),
                        }),
                    ],
                });
            }
            var U = n(183),
                Z = n(902);
            function X(e) {
                var t = e.open,
                    n = e.onClose,
                    a = Object(l.useState)(0),
                    r = Object(i.a)(a, 2),
                    c = r[0],
                    u = r[1];
                return Object(o.jsx)(U.a, {
                    open: t,
                    onClose: n,
                    title: "Manage Category - Satatus - Priority",
                    children: Object(o.jsxs)(s.a, {
                        children: [
                            Object(o.jsxs)(R.a, {
                                value: c,
                                textColor: "primary",
                                onChange: function (e, t) {
                                    return u(t);
                                },
                                children: [
                                    Object(o.jsx)(I.a, { label: "Category" }),
                                    Object(o.jsx)(I.a, { label: "Status" }),
                                    Object(o.jsx)(I.a, { label: "Priority" }),
                                ],
                            }),
                            0 === c &&
                                Object(o.jsx)(Z.a, {
                                    type: "Category",
                                    addRecord: function (e) {
                                        return Object(P.g)("/activitycategory", { name: e });
                                    },
                                    deleteRecord: function (e) {
                                        return Object(P.b)("/activitycategory/" + e);
                                    },
                                    getRecord: function () {
                                        return Object(P.c)("/activitycategory");
                                    },
                                    updateRecord: function (e, t) {
                                        return Object(P.f)("/activitycategory/" + e, { name: t });
                                    },
                                }),
                            1 === c &&
                                Object(o.jsx)(Z.a, {
                                    type: "Status",
                                    addRecord: function (e) {
                                        return Object(P.g)("/activitystatus", { name: e });
                                    },
                                    deleteRecord: function (e) {
                                        return Object(P.b)("/activitystatus/" + e);
                                    },
                                    getRecord: function () {
                                        return Object(P.c)("/activitystatus");
                                    },
                                    updateRecord: function (e, t) {
                                        return Object(P.f)("/activitystatus/" + e, { name: t });
                                    },
                                }),
                            2 === c &&
                                Object(o.jsx)(Z.a, {
                                    type: "Priority",
                                    addRecord: function (e) {
                                        return Object(P.g)("/activitypriority", { name: e });
                                    },
                                    deleteRecord: function (e) {
                                        return Object(P.b)("/activitypriority/" + e);
                                    },
                                    getRecord: function () {
                                        return Object(P.c)("/activitypriority");
                                    },
                                    updateRecord: function (e, t) {
                                        return Object(P.f)("/activitypriority/" + e, { name: t });
                                    },
                                }),
                        ],
                    }),
                });
            }
            var K = T.c().shape({ name: T.d().required() });
            function Y(e) {
                var t = e.open,
                    n = e.onClose,
                    a = e.onDone,
                    i = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e(t, n) {
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    return n.setSubmitting, (e.prev = 1), (e.next = 4), Object(H.a)(t);
                                                case 4:
                                                    e.sent && a(), (e.next = 11);
                                                    break;
                                                case 8:
                                                    (e.prev = 8), (e.t0 = e.catch(1)), console.log(e.t0);
                                                case 11:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[1, 8]]
                                );
                            })
                        );
                        return function (t, n) {
                            return e.apply(this, arguments);
                        };
                    })();
                return Object(o.jsx)(U.a, {
                    open: t,
                    onClose: n,
                    title: "Add new activity",
                    maxWidth: "sm",
                    children: Object(o.jsx)(s.a, {
                        m: 3,
                        children: Object(o.jsx)(B.b, {
                            initialValues: {},
                            validationSchema: K,
                            onSubmit: i,
                            children: function (e) {
                                var n = e.values,
                                    a = e.errors,
                                    r = e.touched,
                                    c = e.handleChange,
                                    i = e.handleBlur;
                                return Object(o.jsx)(B.a, {
                                    children: Object(o.jsxs)(s.a, {
                                        children: [
                                            Object(o.jsxs)(s.a, {
                                                display: "grid",
                                                gridTemplateColumns: "auto auto auto",
                                                gridColumnGap: 10,
                                                gridRowGap: 10,
                                                children: [
                                                    Object(o.jsx)(F.c, {
                                                        error: Boolean(a.name && r.name),
                                                        name: "name",
                                                        label: "name",
                                                        value: n.name,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(F.c, {
                                                        name: "subject",
                                                        label: "subject",
                                                        value: n.subject,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(F.c, {
                                                        name: "location",
                                                        label: "location",
                                                        value: n.location,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(F.c, {
                                                        name: "notes",
                                                        label: "notes",
                                                        value: n.notes,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(F.c, {
                                                        type: "date",
                                                        name: "startTime",
                                                        label: "Start time",
                                                        value: n.startTime,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(F.c, {
                                                        type: "date",
                                                        name: "endTime",
                                                        label: "End time",
                                                        value: n.endTime,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        style: { width: "100%" },
                                                        request: M.d,
                                                        itemTitleField: "name",
                                                        itemValueField: "id",
                                                        label: "Client",
                                                        name: "ClientId",
                                                        value: n.ClientId,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        style: { width: "100%" },
                                                        label: "Contact",
                                                        name: "ContactId",
                                                        request: L.d,
                                                        itemTitleField: "lastName",
                                                        itemValueField: "id",
                                                        value: n.ContactId,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        style: { width: "100%" },
                                                        label: "Project",
                                                        name: "ProjectId",
                                                        request: V.c,
                                                        itemTitleField: "name",
                                                        itemValueField: "id",
                                                        value: n.ProjectId,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        style: { width: "100%" },
                                                        label: "Employee",
                                                        name: "EmployeeId",
                                                        request: z.e,
                                                        itemTitleField: "username",
                                                        itemValueField: "id",
                                                        value: n.EmployeeId,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        style: { width: "100%" },
                                                        label: "Quote",
                                                        name: "QuoteId",
                                                        request: q.e,
                                                        itemTitleField: "number",
                                                        itemValueField: "id",
                                                        value: n.QuoteId,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        style: { width: "100%" },
                                                        label: "ActivityCategoryId",
                                                        name: "ActivityCategoryId",
                                                        request: function () {
                                                            return Object(P.d)("/activitycategory");
                                                        },
                                                        itemTitleField: "name",
                                                        itemValueField: "id",
                                                        value: n.ActivityCategoryId,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                ],
                                            }),
                                            Object(o.jsxs)(s.a, {
                                                display: "flex",
                                                justifyContent: "space-between",
                                                my: 1.2,
                                                children: [
                                                    Object(o.jsx)(A.c, {
                                                        label: "ActivityStatusId",
                                                        name: "ActivityStatusId",
                                                        request: function () {
                                                            return Object(P.d)("/activitystatus");
                                                        },
                                                        itemTitleField: "name",
                                                        itemValueField: "id",
                                                        value: n.ActivityStatusId,
                                                        onChange: c,
                                                        onBlur: i,
                                                        style: { flex: 1, marginRight: 5 },
                                                    }),
                                                    Object(o.jsx)(A.c, {
                                                        label: "ActivityPriorityId",
                                                        name: "ActivityPriorityId",
                                                        request: function () {
                                                            return Object(P.d)("/activitypriority");
                                                        },
                                                        itemTitleField: "name",
                                                        itemValueField: "id",
                                                        value: n.ActivityPriorityId,
                                                        onChange: c,
                                                        onBlur: i,
                                                        style: { flex: 1 },
                                                    }),
                                                ],
                                            }),
                                            Object(o.jsxs)(s.a, {
                                                children: [
                                                    Object(o.jsxs)(s.a, {
                                                        display: "flex",
                                                        children: [
                                                            Object(o.jsx)(D.a, {
                                                                style: { flex: 1 },
                                                                name: "allDayActivity",
                                                                control: Object(o.jsx)(N.a, {}),
                                                                label: "All day activity",
                                                                checked: n.allDayActivity,
                                                                onChange: c,
                                                                onBlur: i,
                                                            }),
                                                            Object(o.jsx)(D.a, {
                                                                style: { flex: 1 },
                                                                name: "notifyOnDay",
                                                                control: Object(o.jsx)(N.a, {}),
                                                                label: "Notify on day",
                                                                checked: n.notifyOnDay,
                                                                onChange: c,
                                                                onBlur: i,
                                                            }),
                                                        ],
                                                    }),
                                                    Object(o.jsxs)(s.a, {
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        children: [
                                                            Object(o.jsx)(D.a, {
                                                                style: { flex: 1 },
                                                                name: "recurring",
                                                                control: Object(o.jsx)(N.a, {}),
                                                                label: "Recurring",
                                                                checked: n.recurring,
                                                                onChange: c,
                                                                onBlur: i,
                                                            }),
                                                            Object(o.jsx)(D.a, {
                                                                style: { flex: 1 },
                                                                name: "notifyNow",
                                                                control: Object(o.jsx)(N.a, {}),
                                                                label: "Notify now",
                                                                checked: n.notifyNow,
                                                                onChange: c,
                                                                onBlur: i,
                                                            }),
                                                        ],
                                                    }),
                                                    Object(o.jsx)(D.a, {
                                                        name: "doNotShowOnCalendar",
                                                        control: Object(o.jsx)(N.a, {}),
                                                        label: "Do not show on calendar",
                                                        checked: n.doNotShowOnCalendar,
                                                        onChange: c,
                                                        onBlur: i,
                                                    }),
                                                ],
                                            }),
                                            Object(o.jsx)(s.a, {
                                                my: 2,
                                                children: Object(o.jsx)("div", {
                                                    style: { display: "flex", width: "100%", alignItems: "flex-end" },
                                                    children: Object(o.jsx)(v.a, {
                                                        kind: "add",
                                                        type: "submit",
                                                        style: t
                                                            ? { width: "50%", marginLeft: "auto", marginRight: "auto" }
                                                            : {
                                                                  marginLeft: "auto",
                                                                  marginRight: "auto",
                                                                  width: "40%",
                                                                  marginBottom: "20px",
                                                                  marginTop: "20px",
                                                                  paddingTop: "8px",
                                                                  paddingBottom: "8px",
                                                              },
                                                        children: t ? "Add" : "Save",
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                });
                            },
                        }),
                    }),
                });
            }
            function ee() {
                var e = Object(l.useState)(0),
                    t = Object(i.a)(e, 2),
                    n = t[0],
                    a = t[1],
                    b = Object(l.useState)(!1),
                    j = Object(i.a)(b, 2),
                    p = j[0],
                    R = j[1],
                    I = Object(l.useState)(!1),
                    B = Object(i.a)(I, 2),
                    T = B[0],
                    D = B[1],
                    N = Object(l.useState)([]),
                    F = Object(i.a)(N, 2),
                    A = F[0],
                    M = F[1],
                    L = Object(l.useState)(),
                    V = Object(i.a)(L, 2),
                    z = V[0],
                    q = V[1],
                    P = Object(l.useState)(!1),
                    W = Object(i.a)(P, 2),
                    $ = W[0],
                    G = W[1],
                    _ = Object(l.useState)(!1),
                    Q = Object(i.a)(_, 2),
                    U = Q[0],
                    Z = Q[1],
                    K = Object(l.useState)(),
                    ee = Object(i.a)(K, 2),
                    te = ee[0],
                    ne = ee[1],
                    ae = Object(l.useState)(),
                    re = Object(i.a)(ae, 2),
                    ce = re[0],
                    ie = re[1],
                    oe = Object(l.useState)(!1),
                    le = Object(i.a)(oe, 2),
                    se = le[0],
                    ue = le[1],
                    de = Object(l.useState)(!1),
                    be = Object(i.a)(de, 2),
                    fe = be[0],
                    je = be[1],
                    me = Object(l.useState)(""),
                    pe = Object(i.a)(me, 2),
                    he = pe[0],
                    Oe = pe[1],
                    xe = Object(l.useState)([]),
                    ve = Object(i.a)(xe, 2),
                    ge = ve[0],
                    ye = ve[1],
                    Ce = Object(l.useState)([]),
                    we = Object(i.a)(Ce, 2),
                    ke = we[0],
                    Ee = we[1],
                    Se = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e() {
                                var t;
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (((e.prev = 0), !z || !z.id)) {
                                                        e.next = 6;
                                                        break;
                                                    }
                                                    return (e.next = 4), Object(C.c)("activity", z.id);
                                                case 4:
                                                    (t = e.sent), ye(t);
                                                case 6:
                                                    e.next = 11;
                                                    break;
                                                case 8:
                                                    (e.prev = 8), (e.t0 = e.catch(0)), console.log(e.t0);
                                                case 11:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[0, 8]]
                                );
                            })
                        );
                        return function () {
                            return e.apply(this, arguments);
                        };
                    })(),
                    Re = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e() {
                                var t;
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (((e.prev = 0), !z || !z.id)) {
                                                        e.next = 6;
                                                        break;
                                                    }
                                                    return (e.next = 4), Object(w.c)("activity", z.id);
                                                case 4:
                                                    (t = e.sent), Ee(t);
                                                case 6:
                                                    e.next = 11;
                                                    break;
                                                case 8:
                                                    (e.prev = 8), (e.t0 = e.catch(0)), console.log(e.t0);
                                                case 11:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[0, 8]]
                                );
                            })
                        );
                        return function () {
                            return e.apply(this, arguments);
                        };
                    })();
                Object(l.useEffect)(
                    function () {
                        1 === n && (Se(), Re());
                    },
                    [n]
                );
                var Ie = (function () {
                    var e = Object(c.a)(
                        r.a.mark(function e() {
                            var t;
                            return r.a.wrap(
                                function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                return (e.prev = 0), (e.next = 3), Object(H.c)();
                                            case 3:
                                                (t = e.sent), M(t), (e.next = 10);
                                                break;
                                            case 7:
                                                (e.prev = 7), (e.t0 = e.catch(0)), console.log(e.t0);
                                            case 10:
                                            case "end":
                                                return e.stop();
                                        }
                                },
                                e,
                                null,
                                [[0, 7]]
                            );
                        })
                    );
                    return function () {
                        return e.apply(this, arguments);
                    };
                })();
                Object(l.useEffect)(function () {
                    Ie();
                }, []);
                var Be = (function () {
                    var e = Object(c.a)(
                        r.a.mark(function e() {
                            return r.a.wrap(
                                function (e) {
                                    for (;;)
                                        switch ((e.prev = e.next)) {
                                            case 0:
                                                if (((e.prev = 0), !z || !z.id)) {
                                                    e.next = 6;
                                                    break;
                                                }
                                                return (e.next = 4), Object(H.b)(z.id);
                                            case 4:
                                                e.sent && (a(0), q(void 0), Ie(), ue(!1));
                                            case 6:
                                                e.next = 11;
                                                break;
                                            case 8:
                                                (e.prev = 8), (e.t0 = e.catch(0)), console.log(e.t0);
                                            case 11:
                                            case "end":
                                                return e.stop();
                                        }
                                },
                                e,
                                null,
                                [[0, 8]]
                            );
                        })
                    );
                    return function () {
                        return e.apply(this, arguments);
                    };
                })();
                return Object(o.jsxs)(o.Fragment, {
                    children: [
                        Object(o.jsx)(x.a, {
                            open: fe,
                            onClose: function () {
                                return je(!1);
                            },
                            children: he,
                        }),
                        Object(o.jsx)(k.a, {
                            open: se,
                            onClose: function () {
                                return ue(!1);
                            },
                            onConfirm: Be,
                        }),
                        Object(o.jsx)(Y, {
                            open: p,
                            onClose: function () {
                                return R(!1);
                            },
                            onDone: Ie,
                        }),
                        Object(o.jsx)(X, {
                            open: T,
                            onClose: function () {
                                return D(!1);
                            },
                        }),
                        z &&
                            z.id &&
                            Object(o.jsx)(E.a, {
                                noteData: te,
                                itemId: z.id,
                                model: "activity",
                                open: $,
                                onClose: function () {
                                    return G(!1);
                                },
                                onDone: Se,
                            }),
                        z &&
                            z.id &&
                            Object(o.jsx)(S.a, {
                                docData: ce,
                                itemId: z.id,
                                model: "activity",
                                open: U,
                                onClose: function () {
                                    return Z(!1);
                                },
                                onDone: Re,
                            }),
                        Object(o.jsxs)(s.a, {
                            my: 1,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            children: [
                                Object(o.jsx)(v.a, {
                                    disabled: 0 === n,
                                    onClick: function () {
                                        ne(void 0), G(!0);
                                    },
                                    children: "Add Note",
                                }),
                                Object(o.jsx)(v.a, {
                                    disabled: 0 === n,
                                    onClick: function () {
                                        ie(void 0), Z(!0);
                                    },
                                    children: "Add Document",
                                }),
                                Object(o.jsx)("div", { style: { flexGrow: 1 } }),
                                Object(o.jsxs)(y.b, {
                                    value: n,
                                    onChange: function (e, t) {
                                        return a(t);
                                    },
                                    children: [
                                        Object(o.jsx)(y.a, { label: "List" }),
                                        Object(o.jsx)(y.a, { label: "Details", disabled: !z }),
                                    ],
                                }),
                            ],
                        }),
                        Object(o.jsxs)(s.a, {
                            display: "flex",
                            alignItems: "flex-start",
                            mt: 1,
                            children: [
                                Object(o.jsxs)(O.a, {
                                    style: { boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px" },
                                    children: [
                                        Object(o.jsx)(u.a, {
                                            children: Object(o.jsx)(d.a, {
                                                onClick: function () {
                                                    return R(!0);
                                                },
                                                children: Object(o.jsx)(m.a, {}),
                                            }),
                                        }),
                                        Object(o.jsx)(u.a, {
                                            children: Object(o.jsx)(d.a, {
                                                disabled: !z,
                                                onClick: function () {
                                                    return ue(!0);
                                                },
                                                children: Object(o.jsx)(f.a, {}),
                                            }),
                                        }),
                                        Object(o.jsx)(u.a, {
                                            children: Object(o.jsx)(d.a, {
                                                onClick: function () {
                                                    return D(!0);
                                                },
                                                children: Object(o.jsx)(h.a, {}),
                                            }),
                                        }),
                                    ],
                                }),
                                Object(o.jsxs)(s.a, {
                                    flex: 11,
                                    ml: 2,
                                    children: [
                                        0 === n &&
                                            Object(o.jsx)(g.b, {
                                                cols: [{ field: "name" }, { field: "subject" }, { field: "location" }],
                                                rows: A,
                                                onRowSelected: function (e) {
                                                    q(e), a(1);
                                                },
                                            }),
                                        1 === n &&
                                            z &&
                                            Object(o.jsx)(J, {
                                                notes: ge,
                                                docs: ke,
                                                onNoteSelected: function (e) {
                                                    ne(e), G(!0);
                                                },
                                                onDocSelected: function (e) {
                                                    ie(e), Z(!0);
                                                },
                                                onDone: function () {
                                                    Oe("Updated..."), je(!0), Ie();
                                                },
                                                selectedActivity: z,
                                            }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                });
            }
        },
        414: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return b;
            });
            var a = n(15),
                r = n(3),
                c = n(2),
                i = (n(0), n(354)),
                o = n(238),
                l = n(1380),
                s = n(785),
                u = n(786),
                d = n(81);
            function b(e) {
                var t = e.kind,
                    n = Object(r.a)(e, ["kind"]),
                    b = Object(i.a)({
                        btnStyle: {
                            background: t
                                ? "add" === t
                                    ? d.a.success
                                    : "edit" === t
                                    ? d.a.warning
                                    : d.a.error
                                : "default",
                            borderRadius: "0.5em",
                            boxShadow: "none",
                            paddingRight: "25px",
                            paddingLeft: "25px",
                        },
                    }),
                    f = { add: Object(c.jsx)(l.a, {}), edit: Object(c.jsx)(s.a, {}), delete: Object(c.jsx)(u.a, {}) },
                    j = b();
                return Object(c.jsx)(
                    o.a,
                    Object(a.a)(
                        Object(a.a)(
                            {
                                className: j.btnStyle,
                                startIcon: t ? f[t] : n.startIcon,
                                variant: t ? "contained" : n.variant,
                                color: t ? "primary" : n.color,
                            },
                            n
                        ),
                        {},
                        { children: n.children }
                    )
                );
            }
        },
        421: function (e, t, n) {
            "use strict";
            n.d(t, "c", function () {
                return i;
            }),
                n.d(t, "b", function () {
                    return o;
                }),
                n.d(t, "a", function () {
                    return l;
                });
            var a = n(2),
                r = (n(0), n(354)),
                c = n(453),
                i = Object(r.a)({
                    root: {
                        backgroundColor: "#f9f9f9",
                        border: "none",
                        "& .MuiDataGrid-columnsContainer": { backgroundColor: "#202731", color: "#fff" },
                        "& .MuiDataGrid-iconSeparator": { display: "none", width: 0, height: 0, opacity: 0 },
                        "& .Mui-selected": {
                            boxShadow: " rgba(149, 157, 165, 0.2) 0px 8px 24px",
                            backgroundColor: "#fff !important",
                        },
                        "& .MuiDataGrid-sortIcon": { fill: "white" },
                    },
                });
            function o(e) {
                var t = e.onRowSelected,
                    n = e.rows,
                    r = e.cols,
                    o = e.height,
                    l = i();
                return Object(a.jsx)("div", {
                    style: { flexGrow: 1, height: o || 450 },
                    children: Object(a.jsx)(c.a, {
                        density: "compact",
                        components: { Toolbar: c.b },
                        className: l.root,
                        onRowSelected: function (e) {
                            t && t(e.data);
                        },
                        columns: r,
                        rows: n,
                    }),
                });
            }
            var l = function (e) {
                var t = e.onRowSelected,
                    n = e.rows,
                    r = e.cols,
                    o = (e.height, i());
                return Object(a.jsx)(c.a, {
                    density: "compact",
                    components: { Toolbar: c.b },
                    className: o.root,
                    onRowSelected: function (e) {
                        t && t(e.data);
                    },
                    columns: r,
                    rows: n,
                });
            };
        },
        422: function (e, t, n) {
            "use strict";
            n.d(t, "d", function () {
                return d;
            }),
                n.d(t, "c", function () {
                    return f;
                }),
                n.d(t, "a", function () {
                    return j;
                }),
                n.d(t, "b", function () {
                    return m;
                });
            var a = n(15),
                r = n(16),
                c = n(3),
                i = n(2),
                o = n(0),
                l = n(1373),
                s = n(159),
                u = n(1403),
                d = function (e) {
                    var t = e.request,
                        n = e.limit,
                        l = e.getOptionLabel,
                        d = e.getOptionValue,
                        b = e.onChange,
                        f = e.value,
                        j = Object(c.a)(e, [
                            "request",
                            "limit",
                            "getOptionLabel",
                            "getOptionValue",
                            "onChange",
                            "value",
                        ]),
                        m = Object(o.useState)([]),
                        p = Object(r.a)(m, 2),
                        h = p[0],
                        O = p[1],
                        x = Object(o.useState)(),
                        v = Object(r.a)(x, 2),
                        g = v[0],
                        y = v[1];
                    return (
                        Object(o.useEffect)(
                            function () {
                                var e = h.find(function (e) {
                                    return d(e) === f;
                                });
                                y(e);
                            },
                            [f, h, d]
                        ),
                        Object(o.useEffect)(
                            function () {
                                t()
                                    .then(function (e) {
                                        O(n && n > 0 ? e.slice(0, n) : e);
                                    })
                                    .catch(function (e) {
                                        return console.log(e);
                                    });
                            },
                            [n, t]
                        ),
                        Object(i.jsx)(u.a, {
                            style: j.style,
                            getOptionLabel: l,
                            options: h,
                            onChange: b,
                            onBlur: j.onBlur,
                            value: g,
                            renderInput: function (e) {
                                return Object(i.jsx)(
                                    s.c,
                                    Object(a.a)(
                                        Object(a.a)({}, e),
                                        {},
                                        {
                                            label: null === j || void 0 === j ? void 0 : j.label,
                                            error: j.error,
                                            placeholder: j.placeholder,
                                        }
                                    )
                                );
                            },
                        })
                    );
                },
                b = function (e) {
                    e.inputStyle;
                    var t = e.items,
                        n = e.itemTitleField,
                        r = e.itemValueField,
                        o = e.keyField,
                        u = Object(c.a)(e, ["inputStyle", "items", "itemTitleField", "itemValueField", "keyField"]);
                    return Object(i.jsxs)(
                        s.c,
                        Object(a.a)(
                            Object(a.a)({}, u),
                            {},
                            {
                                select: !0,
                                style: Object(a.a)(Object(a.a)({}, u.style), {}, { fontSize: "0.8rem" }),
                                children: [
                                    Object(i.jsx)(l.a, { value: void 0, children: "None" }),
                                    t &&
                                        t.length >= 0 &&
                                        t.map(function (e, t) {
                                            return Object(i.jsx)(l.a, { value: e[r], children: e[n] }, o ? e[o] : t);
                                        }),
                                ],
                            }
                        )
                    );
                },
                f = function (e) {
                    e.keyField;
                    var t = e.request,
                        n = e.itemValueField,
                        l = e.itemTitleField,
                        s = e.limit,
                        u = e.getOptionList,
                        d = Object(c.a)(e, [
                            "keyField",
                            "request",
                            "itemValueField",
                            "itemTitleField",
                            "limit",
                            "getOptionList",
                        ]),
                        f = Object(o.useState)([]),
                        j = Object(r.a)(f, 2),
                        m = j[0],
                        p = j[1];
                    return (
                        Object(o.useEffect)(
                            function () {
                                t()
                                    .then(function (e) {
                                        if (s && s > 0) {
                                            var t = u ? u(e) : e.slice(0, s);
                                            p(t);
                                        } else {
                                            var n = u ? u(e) : e;
                                            p(n);
                                        }
                                    })
                                    .catch(function (e) {
                                        return console.log(e);
                                    });
                            },
                            [u, s, t]
                        ),
                        Object(i.jsx)(
                            b,
                            Object(a.a)(Object(a.a)({}, d), {}, { itemTitleField: l, itemValueField: n, items: m })
                        )
                    );
                },
                j = function (e) {
                    var t = e.items,
                        n = Object(c.a)(e, ["items"]);
                    return Object(i.jsx)(
                        b,
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
                            n
                        )
                    );
                },
                m = function (e) {
                    return Object(i.jsx)(
                        s.c,
                        Object(a.a)(Object(a.a)({}, e), {}, { select: !0, children: e.children })
                    );
                };
        },
        423: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return o;
            }),
                n.d(t, "b", function () {
                    return l;
                });
            var a = n(15),
                r = n(2),
                c = (n(0), n(7)),
                i = n(180),
                o = Object(c.a)(function (e) {
                    return { root: { borderRadius: 10, padding: "1em" } };
                })(function (e) {
                    return Object(r.jsx)(i.a, Object(a.a)({ elevation: 3 }, e));
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
                    return Object(r.jsx)(i.a, Object(a.a)(Object(a.a)({}, e), {}, { elevation: 5 }));
                });
        },
        424: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return r;
            });
            var a = n(233),
                r = function (e) {
                    return e ? Object(a.a)(e, "MM/dd/yyyy") : "";
                };
        },
        457: function (e, t, n) {
            "use strict";
            n.d(t, "c", function () {
                return r;
            }),
                n.d(t, "a", function () {
                    return c;
                }),
                n.d(t, "d", function () {
                    return i;
                }),
                n.d(t, "b", function () {
                    return o;
                });
            var a = n(20),
                r = function (e, t) {
                    return Object(a.d)("/document/".concat(e, "/").concat(t));
                },
                c = function (e, t, n, r, c) {
                    var i = new FormData();
                    return (
                        i.append("document", n),
                        i.append("description", r),
                        c && i.append("fileName", c),
                        Object(a.g)("/document/".concat(e, "/").concat(t), i)
                    );
                },
                i = function (e, t, n) {
                    var r = new FormData();
                    return r.append("document", t), r.append("description", n), Object(a.f)("/document/".concat(e), r);
                },
                o = function (e) {
                    return Object(a.b)("/document/".concat(e));
                };
        },
        459: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return I;
            });
            var a = n(31),
                r = n.n(a),
                c = n(65),
                i = n(2),
                o = n(0),
                l = n(157),
                s = n(1),
                u = n(3),
                d = (n(8), n(4)),
                b = n(9),
                f = n(7),
                j = n(185),
                m = n(12),
                p = n(79),
                h = o.forwardRef(function (e, t) {
                    var n = e.classes,
                        a = e.className,
                        r = e.color,
                        c = void 0 === r ? "primary" : r,
                        i = e.component,
                        l = void 0 === i ? "a" : i,
                        f = e.onBlur,
                        h = e.onFocus,
                        O = e.TypographyClasses,
                        x = e.underline,
                        v = void 0 === x ? "hover" : x,
                        g = e.variant,
                        y = void 0 === g ? "inherit" : g,
                        C = Object(u.a)(e, [
                            "classes",
                            "className",
                            "color",
                            "component",
                            "onBlur",
                            "onFocus",
                            "TypographyClasses",
                            "underline",
                            "variant",
                        ]),
                        w = Object(j.a)(),
                        k = w.isFocusVisible,
                        E = w.onBlurVisible,
                        S = w.ref,
                        R = o.useState(!1),
                        I = R[0],
                        B = R[1],
                        T = Object(m.a)(t, S);
                    return o.createElement(
                        p.a,
                        Object(s.a)(
                            {
                                className: Object(d.a)(
                                    n.root,
                                    n["underline".concat(Object(b.a)(v))],
                                    a,
                                    I && n.focusVisible,
                                    "button" === l && n.button
                                ),
                                classes: O,
                                color: c,
                                component: l,
                                onBlur: function (e) {
                                    I && (E(), B(!1)), f && f(e);
                                },
                                onFocus: function (e) {
                                    k(e) && B(!0), h && h(e);
                                },
                                ref: T,
                                variant: y,
                            },
                            C
                        )
                    );
                }),
                O = Object(f.a)(
                    {
                        root: {},
                        underlineNone: { textDecoration: "none" },
                        underlineHover: { textDecoration: "none", "&:hover": { textDecoration: "underline" } },
                        underlineAlways: { textDecoration: "underline" },
                        button: {
                            position: "relative",
                            WebkitTapHighlightColor: "transparent",
                            backgroundColor: "transparent",
                            outline: 0,
                            border: 0,
                            margin: 0,
                            borderRadius: 0,
                            padding: 0,
                            cursor: "pointer",
                            userSelect: "none",
                            verticalAlign: "middle",
                            "-moz-appearance": "none",
                            "-webkit-appearance": "none",
                            "&::-moz-focus-inner": { borderStyle: "none" },
                            "&$focusVisible": { outline: "auto" },
                        },
                        focusVisible: {},
                    },
                    { name: "MuiLink" }
                )(h),
                x = n(241),
                v = n(87),
                g = n(183),
                y = n(414),
                C = n(457),
                w = n(526),
                k = n.n(w);
            function E(e) {
                var t = e.pdf,
                    n = e.height;
                return Object(i.jsxs)("object", {
                    width: "100%",
                    height: n || 400,
                    data: t,
                    type: "application/pdf",
                    children: [
                        Object(i.jsx)("embed", { src: t, type: "application/pdf" }),
                        'Can"t load pdf :(, If you have IDM extention please desable it or download the file',
                    ],
                });
            }
            var S = n(182),
                R = function (e, t) {
                    return Object(S.c)("/document/".concat(e, "/").concat(t));
                };
            function I(e) {
                var t = e.open,
                    n = e.onClose,
                    a = e.model,
                    s = e.itemId,
                    u = e.onDone,
                    d = e.docData,
                    b = Object(o.useRef)(),
                    f = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e() {
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (((e.prev = 0), !d || !d.id)) {
                                                        e.next = 7;
                                                        break;
                                                    }
                                                    return (e.next = 4), Object(C.b)(d.id);
                                                case 4:
                                                    u && u(), R(a, s), n();
                                                case 7:
                                                    e.next = 12;
                                                    break;
                                                case 9:
                                                    (e.prev = 9), (e.t0 = e.catch(0)), console.log(e.t0);
                                                case 12:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[0, 9]]
                                );
                            })
                        );
                        return function () {
                            return e.apply(this, arguments);
                        };
                    })(),
                    j = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e(t, c) {
                                var i;
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (((i = c.setSubmitting), (e.prev = 1), !d || !d.id)) {
                                                        e.next = 10;
                                                        break;
                                                    }
                                                    return (e.next = 5), Object(C.d)(d.id, t.file, t.description);
                                                case 5:
                                                    u && u(), R(a, s), n(), (e.next = 15);
                                                    break;
                                                case 10:
                                                    return (e.next = 12), Object(C.a)(a, s, t.file, t.description);
                                                case 12:
                                                    u && u(), R(a, s), n();
                                                case 15:
                                                    e.next = 20;
                                                    break;
                                                case 17:
                                                    (e.prev = 17), (e.t0 = e.catch(1)), console.log(e.t0);
                                                case 20:
                                                    return (e.prev = 20), i(!1), e.finish(20);
                                                case 23:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[1, 17, 20, 23]]
                                );
                            })
                        );
                        return function (t, n) {
                            return e.apply(this, arguments);
                        };
                    })();
                return Object(i.jsx)(g.a, {
                    open: t,
                    onClose: n,
                    fullScreen: !0,
                    title: "".concat(d ? "Edit" : "Add", " Document to ").concat(a),
                    children: Object(i.jsxs)(l.a, {
                        height: "82vh",
                        m: 3,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gridColumnGap: 10,
                        children: [
                            Object(i.jsx)(l.a, {
                                children:
                                    (null === d || void 0 === d ? void 0 : d.path) &&
                                    Object(i.jsx)(E, {
                                        height: "100%",
                                        pdf:
                                            "http://digitalphocus.ir/" + (null === d || void 0 === d ? void 0 : d.path),
                                    }),
                            }),
                            Object(i.jsx)(v.b, {
                                initialValues: d || {},
                                onSubmit: j,
                                children: function (e) {
                                    var t = e.values,
                                        n = e.handleBlur,
                                        a = e.handleChange,
                                        r = e.setFieldValue,
                                        c = e.isSubmitting;
                                    return Object(i.jsx)(v.a, {
                                        children: Object(i.jsxs)(l.a, {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            flexDirection: "column",
                                            children: [
                                                Object(i.jsx)("input", {
                                                    type: "file",
                                                    ref: function (e) {
                                                        return (b.current = e);
                                                    },
                                                    hidden: !0,
                                                    onChange: function (e) {
                                                        return null !== e.target.files && r("file", e.target.files[0]);
                                                    },
                                                }),
                                                Object(i.jsxs)(y.a, {
                                                    color: "primary",
                                                    style: {
                                                        backgroundColor: "#fff",
                                                        color: " rgb(43,140,255) ",
                                                        border: "1px solid rgb(43,140,255) ",
                                                        width: "100%",
                                                    },
                                                    variant: "contained",
                                                    onClick: function () {
                                                        var e;
                                                        return null === (e = b.current) || void 0 === e
                                                            ? void 0
                                                            : e.click();
                                                    },
                                                    children: [
                                                        Object(i.jsx)(k.a, { style: { marginRight: "7px" } }),
                                                        "Upload file",
                                                    ],
                                                }),
                                                Object(i.jsx)("div", {
                                                    style: { margin: "1em 0" },
                                                    children: t.file
                                                        ? Object(i.jsx)("p", { children: "ads" })
                                                        : d
                                                        ? Object(i.jsx)(O, {
                                                              download: !0,
                                                              href: d.path,
                                                              children: "Download previous file",
                                                          })
                                                        : "",
                                                }),
                                                Object(i.jsx)(x.a, {
                                                    style: { marginBottom: "20px" },
                                                    fullWidth: !0,
                                                    value: t.description,
                                                    name: "description",
                                                    label: "Description",
                                                    variant: "outlined",
                                                    multiline: !0,
                                                    rows: 4,
                                                    onChange: a,
                                                    onBlur: n,
                                                }),
                                                Object(i.jsxs)(l.a, {
                                                    style: { display: "flex", width: "100%" },
                                                    children: [
                                                        Object(i.jsx)(y.a, {
                                                            type: "submit",
                                                            kind: d ? "edit" : "add",
                                                            disabled: c,
                                                            style: { flex: 1 },
                                                            children: "Save",
                                                        }),
                                                        d &&
                                                            Object(i.jsx)(y.a, {
                                                                style: { marginLeft: "1em" },
                                                                onClick: f,
                                                                kind: "delete",
                                                                disabled: c,
                                                                children: "Delete",
                                                            }),
                                                    ],
                                                }),
                                            ],
                                        }),
                                    });
                                },
                            }),
                        ],
                    }),
                });
            }
        },
        509: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return i;
            });
            var a = n(2),
                r = (n(0), n(831)),
                c = n(830);
            function i(e) {
                var t = e.open,
                    n = e.onClose,
                    i = e.severity,
                    o = e.children;
                return Object(a.jsx)(r.a, {
                    open: t,
                    autoHideDuration: 6e3,
                    onClose: n,
                    children: Object(a.jsx)(c.a, { onClose: n, severity: i, children: o }),
                });
            }
        },
        512: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return a;
            });
            var a = function (e) {
                return e.split(".").pop();
            };
        },
        525: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return h;
            });
            var a = n(31),
                r = n.n(a),
                c = n(65),
                i = n(2),
                o = (n(0), n(157)),
                l = n(87),
                s = n(80),
                u = n(183),
                d = n(414),
                b = n(159),
                f = n(598),
                j = n(182),
                m = s.c().shape({ subject: s.d().min(1, "Too short!").required(), note: s.d().required() }),
                p = function (e, t) {
                    return Object(j.c)("/note/".concat(e, "/").concat(t));
                };
            function h(e) {
                var t = e.open,
                    n = e.onClose,
                    a = e.model,
                    s = e.itemId,
                    j = e.noteData,
                    h = e.onDone,
                    O = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e(t, c) {
                                var i;
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (
                                                        ((i = c.setSubmitting),
                                                        (e.prev = 1),
                                                        !j || !(null === j || void 0 === j ? void 0 : j.id))
                                                    ) {
                                                        e.next = 10;
                                                        break;
                                                    }
                                                    return (
                                                        (e.next = 5),
                                                        Object(f.d)(null === j || void 0 === j ? void 0 : j.id, t)
                                                    );
                                                case 5:
                                                    h && h(), p(a, s), n(), (e.next = 15);
                                                    break;
                                                case 10:
                                                    return (e.next = 12), Object(f.a)(a, s, t);
                                                case 12:
                                                    h && h(), p(a, s), n();
                                                case 15:
                                                    e.next = 20;
                                                    break;
                                                case 17:
                                                    (e.prev = 17), (e.t0 = e.catch(1)), console.log(e.t0);
                                                case 20:
                                                    return (e.prev = 20), i(!1), e.finish(20);
                                                case 23:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[1, 17, 20, 23]]
                                );
                            })
                        );
                        return function (t, n) {
                            return e.apply(this, arguments);
                        };
                    })(),
                    x = (function () {
                        var e = Object(c.a)(
                            r.a.mark(function e() {
                                return r.a.wrap(
                                    function (e) {
                                        for (;;)
                                            switch ((e.prev = e.next)) {
                                                case 0:
                                                    if (((e.prev = 0), !j || !j.id)) {
                                                        e.next = 7;
                                                        break;
                                                    }
                                                    return (e.next = 4), Object(f.b)(j.id);
                                                case 4:
                                                    h && h(), p(a, s), n();
                                                case 7:
                                                    e.next = 12;
                                                    break;
                                                case 9:
                                                    (e.prev = 9), (e.t0 = e.catch(0)), console.log(e.t0);
                                                case 12:
                                                case "end":
                                                    return e.stop();
                                            }
                                    },
                                    e,
                                    null,
                                    [[0, 9]]
                                );
                            })
                        );
                        return function () {
                            return e.apply(this, arguments);
                        };
                    })();
                return Object(i.jsx)(u.a, {
                    open: t,
                    onClose: n,
                    title: ""
                        .concat((null === j || void 0 === j ? void 0 : j.id) ? "Edit" : "Add", " a note to ")
                        .concat(a),
                    children: Object(i.jsx)(o.a, {
                        m: 3,
                        children: Object(i.jsx)(l.b, {
                            initialValues: j || {},
                            validationSchema: m,
                            onSubmit: O,
                            children: function (e) {
                                var t = e.values,
                                    n = e.errors,
                                    a = e.touched,
                                    r = e.handleBlur,
                                    c = e.handleChange,
                                    s = e.isSubmitting;
                                return Object(i.jsxs)(l.a, {
                                    children: [
                                        Object(i.jsxs)(o.a, {
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gridColumnGap: 10,
                                            gridRowGap: 10,
                                            children: [
                                                Object(i.jsx)(b.c, {
                                                    name: "subject",
                                                    onBlur: r,
                                                    onChange: c,
                                                    error: Boolean(n.subject && a.subject),
                                                    helperText: n.subject && a.subject,
                                                    value: t.subject,
                                                    label: "subject",
                                                }),
                                                Object(i.jsx)(b.c, {
                                                    name: "url",
                                                    onBlur: r,
                                                    onChange: c,
                                                    value: t.url,
                                                    error: Boolean(n.url && a.url),
                                                    helperText: n.url && a.url,
                                                    label: "url",
                                                }),
                                                Object(i.jsx)(b.c, {
                                                    style: { gridColumnEnd: "span 2" },
                                                    name: "note",
                                                    onBlur: r,
                                                    onChange: c,
                                                    value: t.note,
                                                    error: Boolean(n.note && a.note),
                                                    helperText: n.note && a.note,
                                                    label: "note",
                                                    multiline: !0,
                                                    rows: 4,
                                                }),
                                            ],
                                        }),
                                        Object(i.jsxs)(o.a, {
                                            my: 2,
                                            textAlign: "center",
                                            display: "flex",
                                            alignItems: "center",
                                            children: [
                                                Object(i.jsx)(d.a, {
                                                    type: "submit",
                                                    style: { flex: 1 },
                                                    disabled: s,
                                                    kind: j ? "edit" : "add",
                                                    children: "Save",
                                                }),
                                                j &&
                                                    Object(i.jsx)(d.a, {
                                                        kind: "delete",
                                                        style: { margin: "0 1em" },
                                                        onClick: x,
                                                        children: "Delete",
                                                    }),
                                            ],
                                        }),
                                    ],
                                });
                            },
                        }),
                    }),
                });
            }
        },
        526: function (e, t, n) {
            "use strict";
            var a = n(88);
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
            var r = a(n(0)),
                c = (0, a(n(112)).default)(
                    r.default.createElement("path", {
                        d: "M21 3H3C2 3 1 4 1 5v14c0 1.1.9 2 2 2h18c1 0 2-1 2-2V5c0-1-1-2-2-2zm0 15.92c-.02.03-.06.06-.08.08H3V5.08L3.08 5h17.83c.03.02.06.06.08.08v13.84zm-10-3.41L8.5 12.5 5 17h14l-4.5-6z",
                    }),
                    "PhotoSizeSelectActualOutlined"
                );
            t.default = c;
        },
        533: function (e, t, n) {
            "use strict";
            n.d(t, "d", function () {
                return r;
            }),
                n.d(t, "c", function () {
                    return c;
                }),
                n.d(t, "a", function () {
                    return i;
                }),
                n.d(t, "e", function () {
                    return o;
                }),
                n.d(t, "b", function () {
                    return l;
                });
            var a = n(20),
                r = function () {
                    return Object(a.d)("/contact");
                },
                c = function (e, t) {
                    return Object(a.d)("/contact/".concat(e, "/").concat(t));
                },
                i = function (e, t, n) {
                    return Object(a.g)("/contact/".concat(e, "/").concat(t), n);
                },
                o = function (e, t) {
                    return Object(a.f)("/contact/".concat(e), t);
                },
                l = function (e) {
                    return Object(a.b)("/contact/".concat(e));
                };
        },
        585: function (e, t, n) {
            "use strict";
            n.d(t, "b", function () {
                return u;
            }),
                n.d(t, "a", function () {
                    return d;
                });
            var a = n(15),
                r = n(2),
                c = (n(0), n(7)),
                i = n(1400),
                o = n(248),
                l = n(1381),
                s = n.p + "static/media/tabBG.426fa8f4.png",
                u = Object(c.a)({
                    root: {
                        minHeight: "45px",
                        border: "1px solid #848484",
                        borderRadius: "0.5em",
                        backgroundImage: "url(".concat(s, ")"),
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                    },
                    indicator: { backgroundColor: "#ccc", height: 0 },
                    vertical: {
                        textAlign: "left",
                        width: "125px",
                        backgroundImage: "url(".concat(s, ")"),
                        backgroundColor: "black",
                        height: "85vh",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        paddingTop: "30px",
                        "& .MuiTabs-indicator": { backgroundColor: "rgb(230,128,49)" },
                    },
                })(i.a),
                d = Object(c.a)(function (e) {
                    return Object(o.a)({
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
        587: function (e, t, n) {
            "use strict";
            n.d(t, "d", function () {
                return r;
            }),
                n.d(t, "a", function () {
                    return c;
                }),
                n.d(t, "b", function () {
                    return i;
                }),
                n.d(t, "c", function () {
                    return o;
                });
            var a = n(20),
                r = function () {
                    return Object(a.d)("/customer");
                },
                c = function (e) {
                    return Object(a.g)("/customer", e);
                },
                i = function (e) {
                    return Object(a.b)("/customer/".concat(e));
                },
                o = function (e, t) {
                    return Object(a.f)("/customer/".concat(e), t);
                };
        },
        597: function (e, t, n) {
            "use strict";
            n.d(t, "e", function () {
                return r;
            }),
                n.d(t, "d", function () {
                    return c;
                }),
                n.d(t, "a", function () {
                    return i;
                }),
                n.d(t, "b", function () {
                    return o;
                }),
                n.d(t, "f", function () {
                    return l;
                }),
                n.d(t, "c", function () {
                    return s;
                });
            var a = n(20),
                r = function () {
                    return Object(a.d)("/quote");
                },
                c = function (e) {
                    return Object(a.d)("/quote/".concat(e));
                },
                i = function (e) {
                    return Object(a.g)("/quote", e);
                },
                o = function (e) {
                    return Object(a.g)("/quote", e);
                },
                l = function (e, t) {
                    return Object(a.f)("/quote/".concat(e), t);
                },
                s = function (e) {
                    return Object(a.b)("/quote/".concat(e));
                };
        },
        598: function (e, t, n) {
            "use strict";
            n.d(t, "c", function () {
                return r;
            }),
                n.d(t, "a", function () {
                    return c;
                }),
                n.d(t, "d", function () {
                    return i;
                }),
                n.d(t, "b", function () {
                    return o;
                });
            var a = n(20),
                r = function (e, t) {
                    return Object(a.d)("/note/".concat(e, "/").concat(t));
                },
                c = function (e, t, n) {
                    return Object(a.g)("/note/".concat(e, "/").concat(t), n);
                },
                i = function (e, t) {
                    return Object(a.f)("/note/".concat(e), t);
                },
                o = function (e) {
                    return Object(a.b)("/note/".concat(e));
                };
        },
        606: function (e, t, n) {
            "use strict";
            var a = n(338),
                r = n(7);
            t.a = Object(r.a)(function (e) {
                return {
                    root: {
                        position: "sticky",
                        top: 70,
                        display: "inline-flex",
                        flexDirection: "column",
                        backgroundColor: "#ffff",
                        boxShadow: e.shadows[4],
                        borderRadius: 50,
                        padding: "8px 4px",
                        "& .MuiListItem-gutters": { padding: "4px 0" },
                    },
                };
            })(a.a);
        },
        612: function (e, t, n) {
            "use strict";
            n.d(t, "c", function () {
                return r;
            }),
                n.d(t, "a", function () {
                    return c;
                }),
                n.d(t, "d", function () {
                    return i;
                }),
                n.d(t, "b", function () {
                    return o;
                });
            var a = n(20),
                r = function () {
                    return Object(a.d)("/project");
                },
                c = function (e) {
                    return Object(a.g)("/project", { name: e });
                },
                i = function (e, t) {
                    return Object(a.f)("/project/".concat(e), t);
                },
                o = function (e) {
                    return Object(a.b)("/project/".concat(e));
                };
        },
        625: function (e, t, n) {
            "use strict";
            var a = n(0),
                r = a.createContext({});
            t.a = r;
        },
        785: function (e, t, n) {
            "use strict";
            var a = n(0),
                r = n.n(a),
                c = n(21);
            t.a = Object(c.a)(
                r.a.createElement("path", {
                    d: "M3 17.46v3.04c0 .28.22.5.5.5h3.04c.13 0 .26-.05.35-.15L17.81 9.94l-3.75-3.75L3.15 17.1c-.1.1-.15.22-.15.36zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
                }),
                "EditRounded"
            );
        },
        786: function (e, t, n) {
            "use strict";
            var a = n(0),
                r = n.n(a),
                c = n(21);
            t.a = Object(c.a)(
                r.a.createElement("path", {
                    d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z",
                }),
                "DeleteRounded"
            );
        },
        820: function (e, t, n) {
            "use strict";
            var a = n(88);
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
            var r = a(n(0)),
                c = (0, a(n(112)).default)(
                    r.default.createElement("path", {
                        d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v10zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1z",
                    }),
                    "DeleteRounded"
                );
            t.default = c;
        },
        830: function (e, t, n) {
            "use strict";
            var a = n(3),
                r = n(1),
                c = n(0),
                i = (n(8), n(4)),
                o = n(18),
                l = n(7),
                s = n(180),
                u = n(56),
                d = Object(u.a)(
                    c.createElement("path", {
                        d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z",
                    }),
                    "SuccessOutlined"
                ),
                b = Object(u.a)(
                    c.createElement("path", {
                        d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z",
                    }),
                    "ReportProblemOutlined"
                ),
                f = Object(u.a)(
                    c.createElement("path", {
                        d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z",
                    }),
                    "ErrorOutline"
                ),
                j = Object(u.a)(
                    c.createElement("path", {
                        d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z",
                    }),
                    "InfoOutlined"
                ),
                m = n(798),
                p = n(237),
                h = n(9),
                O = {
                    success: c.createElement(d, { fontSize: "inherit" }),
                    warning: c.createElement(b, { fontSize: "inherit" }),
                    error: c.createElement(f, { fontSize: "inherit" }),
                    info: c.createElement(j, { fontSize: "inherit" }),
                },
                x = c.createElement(m.a, { fontSize: "small" }),
                v = c.forwardRef(function (e, t) {
                    var n = e.action,
                        o = e.children,
                        l = e.classes,
                        u = e.className,
                        d = e.closeText,
                        b = void 0 === d ? "Close" : d,
                        f = e.color,
                        j = e.icon,
                        m = e.iconMapping,
                        v = void 0 === m ? O : m,
                        g = e.onClose,
                        y = e.role,
                        C = void 0 === y ? "alert" : y,
                        w = e.severity,
                        k = void 0 === w ? "success" : w,
                        E = e.variant,
                        S = void 0 === E ? "standard" : E,
                        R = Object(a.a)(e, [
                            "action",
                            "children",
                            "classes",
                            "className",
                            "closeText",
                            "color",
                            "icon",
                            "iconMapping",
                            "onClose",
                            "role",
                            "severity",
                            "variant",
                        ]);
                    return c.createElement(
                        s.a,
                        Object(r.a)(
                            {
                                role: C,
                                square: !0,
                                elevation: 0,
                                className: Object(i.a)(l.root, l["".concat(S).concat(Object(h.a)(f || k))], u),
                                ref: t,
                            },
                            R
                        ),
                        !1 !== j ? c.createElement("div", { className: l.icon }, j || v[k] || O[k]) : null,
                        c.createElement("div", { className: l.message }, o),
                        null != n ? c.createElement("div", { className: l.action }, n) : null,
                        null == n && g
                            ? c.createElement(
                                  "div",
                                  { className: l.action },
                                  c.createElement(
                                      p.a,
                                      { size: "small", "aria-label": b, title: b, color: "inherit", onClick: g },
                                      x
                                  )
                              )
                            : null
                    );
                });
            t.a = Object(l.a)(
                function (e) {
                    var t = "light" === e.palette.type ? o.a : o.i,
                        n = "light" === e.palette.type ? o.i : o.a;
                    return {
                        root: Object(r.a)({}, e.typography.body2, {
                            borderRadius: e.shape.borderRadius,
                            backgroundColor: "transparent",
                            display: "flex",
                            padding: "6px 16px",
                        }),
                        standardSuccess: {
                            color: t(e.palette.success.main, 0.6),
                            backgroundColor: n(e.palette.success.main, 0.9),
                            "& $icon": { color: e.palette.success.main },
                        },
                        standardInfo: {
                            color: t(e.palette.info.main, 0.6),
                            backgroundColor: n(e.palette.info.main, 0.9),
                            "& $icon": { color: e.palette.info.main },
                        },
                        standardWarning: {
                            color: t(e.palette.warning.main, 0.6),
                            backgroundColor: n(e.palette.warning.main, 0.9),
                            "& $icon": { color: e.palette.warning.main },
                        },
                        standardError: {
                            color: t(e.palette.error.main, 0.6),
                            backgroundColor: n(e.palette.error.main, 0.9),
                            "& $icon": { color: e.palette.error.main },
                        },
                        outlinedSuccess: {
                            color: t(e.palette.success.main, 0.6),
                            border: "1px solid ".concat(e.palette.success.main),
                            "& $icon": { color: e.palette.success.main },
                        },
                        outlinedInfo: {
                            color: t(e.palette.info.main, 0.6),
                            border: "1px solid ".concat(e.palette.info.main),
                            "& $icon": { color: e.palette.info.main },
                        },
                        outlinedWarning: {
                            color: t(e.palette.warning.main, 0.6),
                            border: "1px solid ".concat(e.palette.warning.main),
                            "& $icon": { color: e.palette.warning.main },
                        },
                        outlinedError: {
                            color: t(e.palette.error.main, 0.6),
                            border: "1px solid ".concat(e.palette.error.main),
                            "& $icon": { color: e.palette.error.main },
                        },
                        filledSuccess: {
                            color: "#fff",
                            fontWeight: e.typography.fontWeightMedium,
                            backgroundColor: e.palette.success.main,
                        },
                        filledInfo: {
                            color: "#fff",
                            fontWeight: e.typography.fontWeightMedium,
                            backgroundColor: e.palette.info.main,
                        },
                        filledWarning: {
                            color: "#fff",
                            fontWeight: e.typography.fontWeightMedium,
                            backgroundColor: e.palette.warning.main,
                        },
                        filledError: {
                            color: "#fff",
                            fontWeight: e.typography.fontWeightMedium,
                            backgroundColor: e.palette.error.main,
                        },
                        icon: { marginRight: 12, padding: "7px 0", display: "flex", fontSize: 22, opacity: 0.9 },
                        message: { padding: "8px 0" },
                        action: {
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "auto",
                            paddingLeft: 16,
                            marginRight: -8,
                        },
                    };
                },
                { name: "MuiAlert" }
            )(v);
        },
        831: function (e, t, n) {
            "use strict";
            var a = n(3),
                r = n(17),
                c = n(1),
                i = n(0),
                o = (n(8), n(4)),
                l = n(7),
                s = n(32),
                u = n(1056),
                d = n(57),
                b = n(9),
                f = n(113),
                j = n(337),
                m = n(180),
                p = n(18),
                h = i.forwardRef(function (e, t) {
                    var n = e.action,
                        r = e.classes,
                        l = e.className,
                        s = e.message,
                        u = e.role,
                        d = void 0 === u ? "alert" : u,
                        b = Object(a.a)(e, ["action", "classes", "className", "message", "role"]);
                    return i.createElement(
                        m.a,
                        Object(c.a)(
                            { role: d, square: !0, elevation: 6, className: Object(o.a)(r.root, l), ref: t },
                            b
                        ),
                        i.createElement("div", { className: r.message }, s),
                        n ? i.createElement("div", { className: r.action }, n) : null
                    );
                }),
                O = Object(l.a)(
                    function (e) {
                        var t = "light" === e.palette.type ? 0.8 : 0.98,
                            n = Object(p.c)(e.palette.background.default, t);
                        return {
                            root: Object(c.a)(
                                {},
                                e.typography.body2,
                                Object(r.a)(
                                    {
                                        color: e.palette.getContrastText(n),
                                        backgroundColor: n,
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                        padding: "6px 16px",
                                        borderRadius: e.shape.borderRadius,
                                        flexGrow: 1,
                                    },
                                    e.breakpoints.up("sm"),
                                    { flexGrow: "initial", minWidth: 288 }
                                )
                            ),
                            message: { padding: "8px 0" },
                            action: {
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "auto",
                                paddingLeft: 16,
                                marginRight: -8,
                            },
                        };
                    },
                    { name: "MuiSnackbarContent" }
                )(h),
                x = i.forwardRef(function (e, t) {
                    var n = e.action,
                        r = e.anchorOrigin,
                        l = (r = void 0 === r ? { vertical: "bottom", horizontal: "center" } : r).vertical,
                        m = r.horizontal,
                        p = e.autoHideDuration,
                        h = void 0 === p ? null : p,
                        x = e.children,
                        v = e.classes,
                        g = e.className,
                        y = e.ClickAwayListenerProps,
                        C = e.ContentProps,
                        w = e.disableWindowBlurListener,
                        k = void 0 !== w && w,
                        E = e.message,
                        S = e.onClose,
                        R = e.onEnter,
                        I = e.onEntered,
                        B = e.onEntering,
                        T = e.onExit,
                        D = e.onExited,
                        N = e.onExiting,
                        F = e.onMouseEnter,
                        A = e.onMouseLeave,
                        M = e.open,
                        L = e.resumeHideDuration,
                        V = e.TransitionComponent,
                        z = void 0 === V ? j.a : V,
                        q = e.transitionDuration,
                        H = void 0 === q ? { enter: s.b.enteringScreen, exit: s.b.leavingScreen } : q,
                        P = e.TransitionProps,
                        W = Object(a.a)(e, [
                            "action",
                            "anchorOrigin",
                            "autoHideDuration",
                            "children",
                            "classes",
                            "className",
                            "ClickAwayListenerProps",
                            "ContentProps",
                            "disableWindowBlurListener",
                            "message",
                            "onClose",
                            "onEnter",
                            "onEntered",
                            "onEntering",
                            "onExit",
                            "onExited",
                            "onExiting",
                            "onMouseEnter",
                            "onMouseLeave",
                            "open",
                            "resumeHideDuration",
                            "TransitionComponent",
                            "transitionDuration",
                            "TransitionProps",
                        ]),
                        $ = i.useRef(),
                        G = i.useState(!0),
                        _ = G[0],
                        Q = G[1],
                        J = Object(d.a)(function () {
                            S && S.apply(void 0, arguments);
                        }),
                        U = Object(d.a)(function (e) {
                            S &&
                                null != e &&
                                (clearTimeout($.current),
                                ($.current = setTimeout(function () {
                                    J(null, "timeout");
                                }, e)));
                        });
                    i.useEffect(
                        function () {
                            return (
                                M && U(h),
                                function () {
                                    clearTimeout($.current);
                                }
                            );
                        },
                        [M, h, U]
                    );
                    var Z = function () {
                            clearTimeout($.current);
                        },
                        X = i.useCallback(
                            function () {
                                null != h && U(null != L ? L : 0.5 * h);
                            },
                            [h, L, U]
                        );
                    return (
                        i.useEffect(
                            function () {
                                if (!k && M)
                                    return (
                                        window.addEventListener("focus", X),
                                        window.addEventListener("blur", Z),
                                        function () {
                                            window.removeEventListener("focus", X),
                                                window.removeEventListener("blur", Z);
                                        }
                                    );
                            },
                            [k, X, M]
                        ),
                        !M && _
                            ? null
                            : i.createElement(
                                  u.a,
                                  Object(c.a)(
                                      {
                                          onClickAway: function (e) {
                                              S && S(e, "clickaway");
                                          },
                                      },
                                      y
                                  ),
                                  i.createElement(
                                      "div",
                                      Object(c.a)(
                                          {
                                              className: Object(o.a)(
                                                  v.root,
                                                  v["anchorOrigin".concat(Object(b.a)(l)).concat(Object(b.a)(m))],
                                                  g
                                              ),
                                              onMouseEnter: function (e) {
                                                  F && F(e), Z();
                                              },
                                              onMouseLeave: function (e) {
                                                  A && A(e), X();
                                              },
                                              ref: t,
                                          },
                                          W
                                      ),
                                      i.createElement(
                                          z,
                                          Object(c.a)(
                                              {
                                                  appear: !0,
                                                  in: M,
                                                  onEnter: Object(f.a)(function () {
                                                      Q(!1);
                                                  }, R),
                                                  onEntered: I,
                                                  onEntering: B,
                                                  onExit: T,
                                                  onExited: Object(f.a)(function () {
                                                      Q(!0);
                                                  }, D),
                                                  onExiting: N,
                                                  timeout: H,
                                                  direction: "top" === l ? "down" : "up",
                                              },
                                              P
                                          ),
                                          x || i.createElement(O, Object(c.a)({ message: E, action: n }, C))
                                      )
                                  )
                              )
                    );
                });
            t.a = Object(l.a)(
                function (e) {
                    var t = { top: 8 },
                        n = { bottom: 8 },
                        a = { justifyContent: "flex-end" },
                        i = { justifyContent: "flex-start" },
                        o = { top: 24 },
                        l = { bottom: 24 },
                        s = { right: 24 },
                        u = { left: 24 },
                        d = { left: "50%", right: "auto", transform: "translateX(-50%)" };
                    return {
                        root: {
                            zIndex: e.zIndex.snackbar,
                            position: "fixed",
                            display: "flex",
                            left: 8,
                            right: 8,
                            justifyContent: "center",
                            alignItems: "center",
                        },
                        anchorOriginTopCenter: Object(c.a)(
                            {},
                            t,
                            Object(r.a)({}, e.breakpoints.up("sm"), Object(c.a)({}, o, d))
                        ),
                        anchorOriginBottomCenter: Object(c.a)(
                            {},
                            n,
                            Object(r.a)({}, e.breakpoints.up("sm"), Object(c.a)({}, l, d))
                        ),
                        anchorOriginTopRight: Object(c.a)(
                            {},
                            t,
                            a,
                            Object(r.a)({}, e.breakpoints.up("sm"), Object(c.a)({ left: "auto" }, o, s))
                        ),
                        anchorOriginBottomRight: Object(c.a)(
                            {},
                            n,
                            a,
                            Object(r.a)({}, e.breakpoints.up("sm"), Object(c.a)({ left: "auto" }, l, s))
                        ),
                        anchorOriginTopLeft: Object(c.a)(
                            {},
                            t,
                            i,
                            Object(r.a)({}, e.breakpoints.up("sm"), Object(c.a)({ right: "auto" }, o, u))
                        ),
                        anchorOriginBottomLeft: Object(c.a)(
                            {},
                            n,
                            i,
                            Object(r.a)({}, e.breakpoints.up("sm"), Object(c.a)({ right: "auto" }, l, u))
                        ),
                    };
                },
                { flip: !1, name: "MuiSnackbar" }
            )(x);
        },
        834: function (e, t, n) {
            "use strict";
            var a = n(88);
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
            var r = a(n(0)),
                c = (0, a(n(112)).default)(
                    r.default.createElement("path", {
                        d: "M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z",
                    }),
                    "AddRounded"
                );
            t.default = c;
        },
        902: function (e, t, n) {
            "use strict";
            n.d(t, "a", function () {
                return x;
            });
            var a = n(31),
                r = n.n(a),
                c = n(65),
                i = n(16),
                o = n(2),
                l = n(0),
                s = n(157),
                u = n(936),
                d = n(920),
                b = n(921),
                f = n(1373),
                j = n(1065),
                m = n(509),
                p = n(159),
                h = n(414),
                O = n(422),
                x = function (e) {
                    var t = e.type,
                        n = e.getRecord,
                        a = e.addRecord,
                        x = e.updateRecord,
                        v = e.deleteRecord,
                        g = e.onDone,
                        y = Object(l.useState)([]),
                        C = Object(i.a)(y, 2),
                        w = C[0],
                        k = C[1],
                        E = Object(l.useState)(!1),
                        S = Object(i.a)(E, 2),
                        R = S[0],
                        I = S[1],
                        B = Object(l.useState)(!1),
                        T = Object(i.a)(B, 2),
                        D = T[0],
                        N = T[1],
                        F = Object(l.useState)(""),
                        A = Object(i.a)(F, 2),
                        M = A[0],
                        L = A[1],
                        V = Object(l.useState)(""),
                        z = Object(i.a)(V, 2),
                        q = z[0],
                        H = z[1],
                        P = Object(l.useState)(""),
                        W = Object(i.a)(P, 2),
                        $ = W[0],
                        G = W[1],
                        _ = Object(l.useState)(),
                        Q = Object(i.a)(_, 2),
                        J = Q[0],
                        U = Q[1],
                        Z = function (e) {
                            N(!0), e.error ? L(e.error) : L("Request Successful...");
                        },
                        X = (function () {
                            var e = Object(c.a)(
                                r.a.mark(function e() {
                                    var t;
                                    return r.a.wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        return (e.prev = 0), (e.next = 3), n();
                                                    case 3:
                                                        (t = e.sent), k(t), (e.next = 10);
                                                        break;
                                                    case 7:
                                                        (e.prev = 7), (e.t0 = e.catch(0)), console.log(e.t0);
                                                    case 10:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        },
                                        e,
                                        null,
                                        [[0, 7]]
                                    );
                                })
                            );
                            return function () {
                                return e.apply(this, arguments);
                            };
                        })();
                    Object(l.useEffect)(function () {
                        X();
                    }, []);
                    var K = (function () {
                            var e = Object(c.a)(
                                r.a.mark(function e() {
                                    var t;
                                    return r.a.wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if ((I(!0), (e.prev = 1), !q)) {
                                                            e.next = 10;
                                                            break;
                                                        }
                                                        return (e.next = 5), a(q);
                                                    case 5:
                                                        (t = e.sent) && I(!1), X(), Z(t), g && g();
                                                    case 10:
                                                        e.next = 15;
                                                        break;
                                                    case 12:
                                                        (e.prev = 12), (e.t0 = e.catch(1)), console.log(e.t0);
                                                    case 15:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        },
                                        e,
                                        null,
                                        [[1, 12]]
                                    );
                                })
                            );
                            return function () {
                                return e.apply(this, arguments);
                            };
                        })(),
                        Y = (function () {
                            var e = Object(c.a)(
                                r.a.mark(function e() {
                                    var t;
                                    return r.a.wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if ((I(!0), (e.prev = 1), !J || !$)) {
                                                            e.next = 10;
                                                            break;
                                                        }
                                                        return (e.next = 5), x(J, $);
                                                    case 5:
                                                        (t = e.sent) && I(!1), X(), Z(t), g && g();
                                                    case 10:
                                                        e.next = 15;
                                                        break;
                                                    case 12:
                                                        (e.prev = 12), (e.t0 = e.catch(1)), console.log(e.t0);
                                                    case 15:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        },
                                        e,
                                        null,
                                        [[1, 12]]
                                    );
                                })
                            );
                            return function () {
                                return e.apply(this, arguments);
                            };
                        })(),
                        ee = (function () {
                            var e = Object(c.a)(
                                r.a.mark(function e() {
                                    var t;
                                    return r.a.wrap(
                                        function (e) {
                                            for (;;)
                                                switch ((e.prev = e.next)) {
                                                    case 0:
                                                        if ((I(!0), (e.prev = 1), !J)) {
                                                            e.next = 10;
                                                            break;
                                                        }
                                                        return (e.next = 5), v(J);
                                                    case 5:
                                                        (t = e.sent) && I(!1), X(), Z(t), g && g();
                                                    case 10:
                                                        e.next = 15;
                                                        break;
                                                    case 12:
                                                        (e.prev = 12), (e.t0 = e.catch(1)), console.log(e.t0);
                                                    case 15:
                                                    case "end":
                                                        return e.stop();
                                                }
                                        },
                                        e,
                                        null,
                                        [[1, 12]]
                                    );
                                })
                            );
                            return function () {
                                return e.apply(this, arguments);
                            };
                        })();
                    return Object(o.jsxs)(o.Fragment, {
                        children: [
                            Object(o.jsx)(m.a, {
                                onClose: function () {
                                    return N(!1);
                                },
                                open: D,
                                children: M,
                            }),
                            Object(o.jsxs)(s.a, {
                                m: 2,
                                p: 2,
                                children: [
                                    Object(o.jsxs)(u.a, {
                                        children: [
                                            Object(o.jsx)(d.a, { expandIcon: Object(o.jsx)(j.a, {}), children: "Add" }),
                                            Object(o.jsx)(b.a, {
                                                children: Object(o.jsx)("form", {
                                                    onSubmit: function (e) {
                                                        e.preventDefault(), K();
                                                    },
                                                    style: { width: "100%" },
                                                    children: Object(o.jsxs)(s.a, {
                                                        width: "100%",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        alignItems: "flex-end",
                                                        children: [
                                                            Object(o.jsx)(p.c, {
                                                                fullWidth: !0,
                                                                value: q,
                                                                onChange: function (e) {
                                                                    return H(e.target.value);
                                                                },
                                                                placeholder: "".concat(t, " name"),
                                                                style: { marginRight: "8px", flex: 1 },
                                                            }),
                                                            Object(o.jsx)(h.a, {
                                                                type: "submit",
                                                                kind: "add",
                                                                disabled: R,
                                                                style: { marginBottom: "8px" },
                                                                children: "Add",
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                    Object(o.jsxs)(u.a, {
                                        defaultExpanded: !0,
                                        children: [
                                            Object(o.jsx)(d.a, {
                                                expandIcon: Object(o.jsx)(j.a, {}),
                                                children: "Edit",
                                            }),
                                            Object(o.jsx)(b.a, {
                                                children: Object(o.jsxs)("form", {
                                                    onSubmit: function (e) {
                                                        e.preventDefault(), Y();
                                                    },
                                                    style: { width: "100%" },
                                                    children: [
                                                        Object(o.jsx)(s.a, {
                                                            width: "100%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            children: Object(o.jsx)(p.c, {
                                                                fullWidth: !0,
                                                                label: "new name",
                                                                value: $,
                                                                onChange: function (e) {
                                                                    return G(e.target.value);
                                                                },
                                                                style: { flex: 1, margin: "0px 0px 5px 0px" },
                                                                placeholder: "New ".concat(t, " name"),
                                                            }),
                                                        }),
                                                        Object(o.jsxs)(s.a, {
                                                            width: "100%",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            children: [
                                                                Object(o.jsx)(O.b, {
                                                                    fullWidth: !0,
                                                                    value: J,
                                                                    onChange: function (e) {
                                                                        return U(e.target.value);
                                                                    },
                                                                    children: w.map(function (e) {
                                                                        return Object(o.jsx)(
                                                                            f.a,
                                                                            { value: e.id, children: e.name },
                                                                            e.id
                                                                        );
                                                                    }),
                                                                }),
                                                                Object(o.jsx)(h.a, {
                                                                    type: "submit",
                                                                    disabled: R,
                                                                    kind: "edit",
                                                                    style: { margin: "0 0.5em" },
                                                                    children: "Save",
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                }),
                                            }),
                                        ],
                                    }),
                                    Object(o.jsxs)(u.a, {
                                        children: [
                                            Object(o.jsx)(d.a, {
                                                expandIcon: Object(o.jsx)(j.a, {}),
                                                children: "Delete",
                                            }),
                                            Object(o.jsx)(b.a, {
                                                children: Object(o.jsx)("form", {
                                                    onSubmit: function (e) {
                                                        e.preventDefault(), ee();
                                                    },
                                                    style: { width: "100%" },
                                                    children: Object(o.jsxs)(s.a, {
                                                        width: "100%",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        children: [
                                                            Object(o.jsx)(O.b, {
                                                                value: J,
                                                                onChange: function (e) {
                                                                    return U(e.target.value);
                                                                },
                                                                fullWidth: !0,
                                                                children: w.map(function (e) {
                                                                    return Object(o.jsx)(
                                                                        f.a,
                                                                        { value: e.id, children: e.name },
                                                                        e.id
                                                                    );
                                                                }),
                                                            }),
                                                            Object(o.jsx)(h.a, {
                                                                type: "submit",
                                                                disabled: R,
                                                                kind: "delete",
                                                                style: { margin: "0 0.5em" },
                                                                children: "Delete",
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    });
                };
        },
        903: function (e, t, n) {
            "use strict";
            n.d(t, "c", function () {
                return r;
            }),
                n.d(t, "d", function () {
                    return c;
                }),
                n.d(t, "a", function () {
                    return i;
                }),
                n.d(t, "e", function () {
                    return o;
                }),
                n.d(t, "b", function () {
                    return l;
                });
            var a = n(20),
                r = function () {
                    return Object(a.d)("/activity");
                },
                c = function (e) {
                    return Object(a.d)("/activity/project/".concat(e));
                },
                i = function (e) {
                    return Object(a.g)("/activity", e);
                },
                o = function (e, t) {
                    return Object(a.f)("/activity/".concat(e), t);
                },
                l = function (e) {
                    return Object(a.b)("/activity/".concat(e));
                };
        },
        919: function (e, t, n) {
            "use strict";
            var a = n(1),
                r = n(16),
                c = n(3),
                i = n(0),
                o = n(4),
                l = (n(8), n(187)),
                s = n(7),
                u = n(32),
                d = n(40),
                b = n(33),
                f = n(12),
                j = i.forwardRef(function (e, t) {
                    var n = e.children,
                        s = e.classes,
                        j = e.className,
                        m = e.collapsedHeight,
                        p = void 0 === m ? "0px" : m,
                        h = e.component,
                        O = void 0 === h ? "div" : h,
                        x = e.disableStrictModeCompat,
                        v = void 0 !== x && x,
                        g = e.in,
                        y = e.onEnter,
                        C = e.onEntered,
                        w = e.onEntering,
                        k = e.onExit,
                        E = e.onExited,
                        S = e.onExiting,
                        R = e.style,
                        I = e.timeout,
                        B = void 0 === I ? u.b.standard : I,
                        T = e.TransitionComponent,
                        D = void 0 === T ? l.a : T,
                        N = Object(c.a)(e, [
                            "children",
                            "classes",
                            "className",
                            "collapsedHeight",
                            "component",
                            "disableStrictModeCompat",
                            "in",
                            "onEnter",
                            "onEntered",
                            "onEntering",
                            "onExit",
                            "onExited",
                            "onExiting",
                            "style",
                            "timeout",
                            "TransitionComponent",
                        ]),
                        F = Object(b.a)(),
                        A = i.useRef(),
                        M = i.useRef(null),
                        L = i.useRef(),
                        V = "number" === typeof p ? "".concat(p, "px") : p;
                    i.useEffect(function () {
                        return function () {
                            clearTimeout(A.current);
                        };
                    }, []);
                    var z = F.unstable_strictMode && !v,
                        q = i.useRef(null),
                        H = Object(f.a)(t, z ? q : void 0),
                        P = function (e) {
                            return function (t, n) {
                                if (e) {
                                    var a = z ? [q.current, t] : [t, n],
                                        c = Object(r.a)(a, 2),
                                        i = c[0],
                                        o = c[1];
                                    void 0 === o ? e(i) : e(i, o);
                                }
                            };
                        },
                        W = P(function (e, t) {
                            (e.style.height = V), y && y(e, t);
                        }),
                        $ = P(function (e, t) {
                            var n = M.current ? M.current.clientHeight : 0,
                                a = Object(d.a)({ style: R, timeout: B }, { mode: "enter" }).duration;
                            if ("auto" === B) {
                                var r = F.transitions.getAutoHeightDuration(n);
                                (e.style.transitionDuration = "".concat(r, "ms")), (L.current = r);
                            } else e.style.transitionDuration = "string" === typeof a ? a : "".concat(a, "ms");
                            (e.style.height = "".concat(n, "px")), w && w(e, t);
                        }),
                        G = P(function (e, t) {
                            (e.style.height = "auto"), C && C(e, t);
                        }),
                        _ = P(function (e) {
                            var t = M.current ? M.current.clientHeight : 0;
                            (e.style.height = "".concat(t, "px")), k && k(e);
                        }),
                        Q = P(E),
                        J = P(function (e) {
                            var t = M.current ? M.current.clientHeight : 0,
                                n = Object(d.a)({ style: R, timeout: B }, { mode: "exit" }).duration;
                            if ("auto" === B) {
                                var a = F.transitions.getAutoHeightDuration(t);
                                (e.style.transitionDuration = "".concat(a, "ms")), (L.current = a);
                            } else e.style.transitionDuration = "string" === typeof n ? n : "".concat(n, "ms");
                            (e.style.height = V), S && S(e);
                        });
                    return i.createElement(
                        D,
                        Object(a.a)(
                            {
                                in: g,
                                onEnter: W,
                                onEntered: G,
                                onEntering: $,
                                onExit: _,
                                onExited: Q,
                                onExiting: J,
                                addEndListener: function (e, t) {
                                    var n = z ? e : t;
                                    "auto" === B && (A.current = setTimeout(n, L.current || 0));
                                },
                                nodeRef: z ? q : void 0,
                                timeout: "auto" === B ? null : B,
                            },
                            N
                        ),
                        function (e, t) {
                            return i.createElement(
                                O,
                                Object(a.a)(
                                    {
                                        className: Object(o.a)(
                                            s.container,
                                            j,
                                            { entered: s.entered, exited: !g && "0px" === V && s.hidden }[e]
                                        ),
                                        style: Object(a.a)({ minHeight: V }, R),
                                        ref: H,
                                    },
                                    t
                                ),
                                i.createElement(
                                    "div",
                                    { className: s.wrapper, ref: M },
                                    i.createElement("div", { className: s.wrapperInner }, n)
                                )
                            );
                        }
                    );
                });
            (j.muiSupportAuto = !0),
                (t.a = Object(s.a)(
                    function (e) {
                        return {
                            container: { height: 0, overflow: "hidden", transition: e.transitions.create("height") },
                            entered: { height: "auto", overflow: "visible" },
                            hidden: { visibility: "hidden" },
                            wrapper: { display: "flex" },
                            wrapperInner: { width: "100%" },
                        };
                    },
                    { name: "MuiCollapse" }
                )(j));
        },
        920: function (e, t, n) {
            "use strict";
            var a = n(1),
                r = n(3),
                c = n(0),
                i = (n(8), n(4)),
                o = n(181),
                l = n(237),
                s = n(7),
                u = n(625),
                d = c.forwardRef(function (e, t) {
                    var n = e.children,
                        s = e.classes,
                        d = e.className,
                        b = e.expandIcon,
                        f = e.IconButtonProps,
                        j = e.onBlur,
                        m = e.onClick,
                        p = e.onFocusVisible,
                        h = Object(r.a)(e, [
                            "children",
                            "classes",
                            "className",
                            "expandIcon",
                            "IconButtonProps",
                            "onBlur",
                            "onClick",
                            "onFocusVisible",
                        ]),
                        O = c.useState(!1),
                        x = O[0],
                        v = O[1],
                        g = c.useContext(u.a),
                        y = g.disabled,
                        C = void 0 !== y && y,
                        w = g.expanded,
                        k = g.toggle;
                    return c.createElement(
                        o.a,
                        Object(a.a)(
                            {
                                focusRipple: !1,
                                disableRipple: !0,
                                disabled: C,
                                component: "div",
                                "aria-expanded": w,
                                className: Object(i.a)(s.root, d, C && s.disabled, w && s.expanded, x && s.focused),
                                onFocusVisible: function (e) {
                                    v(!0), p && p(e);
                                },
                                onBlur: function (e) {
                                    v(!1), j && j(e);
                                },
                                onClick: function (e) {
                                    k && k(e), m && m(e);
                                },
                                ref: t,
                            },
                            h
                        ),
                        c.createElement("div", { className: Object(i.a)(s.content, w && s.expanded) }, n),
                        b &&
                            c.createElement(
                                l.a,
                                Object(a.a)(
                                    {
                                        className: Object(i.a)(s.expandIcon, w && s.expanded),
                                        edge: "end",
                                        component: "div",
                                        tabIndex: null,
                                        role: null,
                                        "aria-hidden": !0,
                                    },
                                    f
                                ),
                                b
                            )
                    );
                });
            t.a = Object(s.a)(
                function (e) {
                    var t = { duration: e.transitions.duration.shortest };
                    return {
                        root: {
                            display: "flex",
                            minHeight: 48,
                            transition: e.transitions.create(["min-height", "background-color"], t),
                            padding: e.spacing(0, 2),
                            "&:hover:not($disabled)": { cursor: "pointer" },
                            "&$expanded": { minHeight: 64 },
                            "&$focused": { backgroundColor: e.palette.action.focus },
                            "&$disabled": { opacity: e.palette.action.disabledOpacity },
                        },
                        expanded: {},
                        focused: {},
                        disabled: {},
                        content: {
                            display: "flex",
                            flexGrow: 1,
                            transition: e.transitions.create(["margin"], t),
                            margin: "12px 0",
                            "&$expanded": { margin: "20px 0" },
                        },
                        expandIcon: {
                            transform: "rotate(0deg)",
                            transition: e.transitions.create("transform", t),
                            "&:hover": { backgroundColor: "transparent" },
                            "&$expanded": { transform: "rotate(180deg)" },
                        },
                    };
                },
                { name: "MuiAccordionSummary" }
            )(d);
        },
        921: function (e, t, n) {
            "use strict";
            var a = n(1),
                r = n(3),
                c = n(0),
                i = (n(8), n(4)),
                o = n(7),
                l = c.forwardRef(function (e, t) {
                    var n = e.classes,
                        o = e.className,
                        l = Object(r.a)(e, ["classes", "className"]);
                    return c.createElement("div", Object(a.a)({ className: Object(i.a)(n.root, o), ref: t }, l));
                });
            t.a = Object(o.a)(
                function (e) {
                    return { root: { display: "flex", padding: e.spacing(1, 2, 2) } };
                },
                { name: "MuiAccordionDetails" }
            )(l);
        },
        936: function (e, t, n) {
            "use strict";
            var a = n(1),
                r = n(188),
                c = n(190),
                i = n(124),
                o = n(189);
            var l = n(16),
                s = n(3),
                u = n(0),
                d = (n(165), n(8), n(4)),
                b = n(919),
                f = n(180),
                j = n(7),
                m = n(625),
                p = n(125),
                h = u.forwardRef(function (e, t) {
                    var n,
                        j = e.children,
                        h = e.classes,
                        O = e.className,
                        x = e.defaultExpanded,
                        v = void 0 !== x && x,
                        g = e.disabled,
                        y = void 0 !== g && g,
                        C = e.expanded,
                        w = e.onChange,
                        k = e.square,
                        E = void 0 !== k && k,
                        S = e.TransitionComponent,
                        R = void 0 === S ? b.a : S,
                        I = e.TransitionProps,
                        B = Object(s.a)(e, [
                            "children",
                            "classes",
                            "className",
                            "defaultExpanded",
                            "disabled",
                            "expanded",
                            "onChange",
                            "square",
                            "TransitionComponent",
                            "TransitionProps",
                        ]),
                        T = Object(p.a)({ controlled: C, default: v, name: "Accordion", state: "expanded" }),
                        D = Object(l.a)(T, 2),
                        N = D[0],
                        F = D[1],
                        A = u.useCallback(
                            function (e) {
                                F(!N), w && w(e, !N);
                            },
                            [N, w, F]
                        ),
                        M = u.Children.toArray(j),
                        L = ((n = M), Object(r.a)(n) || Object(c.a)(n) || Object(i.a)(n) || Object(o.a)()),
                        V = L[0],
                        z = L.slice(1),
                        q = u.useMemo(
                            function () {
                                return { expanded: N, disabled: y, toggle: A };
                            },
                            [N, y, A]
                        );
                    return u.createElement(
                        f.a,
                        Object(a.a)(
                            {
                                className: Object(d.a)(h.root, O, N && h.expanded, y && h.disabled, !E && h.rounded),
                                ref: t,
                                square: E,
                            },
                            B
                        ),
                        u.createElement(m.a.Provider, { value: q }, V),
                        u.createElement(
                            R,
                            Object(a.a)({ in: N, timeout: "auto" }, I),
                            u.createElement(
                                "div",
                                { "aria-labelledby": V.props.id, id: V.props["aria-controls"], role: "region" },
                                z
                            )
                        )
                    );
                });
            t.a = Object(j.a)(
                function (e) {
                    var t = { duration: e.transitions.duration.shortest };
                    return {
                        root: {
                            position: "relative",
                            transition: e.transitions.create(["margin"], t),
                            "&:before": {
                                position: "absolute",
                                left: 0,
                                top: -1,
                                right: 0,
                                height: 1,
                                content: '""',
                                opacity: 1,
                                backgroundColor: e.palette.divider,
                                transition: e.transitions.create(["opacity", "background-color"], t),
                            },
                            "&:first-child": { "&:before": { display: "none" } },
                            "&$expanded": {
                                margin: "16px 0",
                                "&:first-child": { marginTop: 0 },
                                "&:last-child": { marginBottom: 0 },
                                "&:before": { opacity: 0 },
                            },
                            "&$expanded + &": { "&:before": { display: "none" } },
                            "&$disabled": { backgroundColor: e.palette.action.disabledBackground },
                        },
                        rounded: {
                            borderRadius: 0,
                            "&:first-child": {
                                borderTopLeftRadius: e.shape.borderRadius,
                                borderTopRightRadius: e.shape.borderRadius,
                            },
                            "&:last-child": {
                                borderBottomLeftRadius: e.shape.borderRadius,
                                borderBottomRightRadius: e.shape.borderRadius,
                                "@supports (-ms-ime-align: auto)": {
                                    borderBottomLeftRadius: 0,
                                    borderBottomRightRadius: 0,
                                },
                            },
                        },
                        expanded: {},
                        disabled: {},
                    };
                },
                { name: "MuiAccordion" }
            )(h);
        },
        952: function (e, t, n) {
            "use strict";
            var a = n(88);
            Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
            var r = a(n(0)),
                c = (0, a(n(112)).default)(
                    r.default.createElement(
                        r.default.Fragment,
                        null,
                        r.default.createElement("path", {
                            d: "M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z",
                        }),
                        r.default.createElement("circle", { cx: "17.5", cy: "17.5", r: "4.5" }),
                        r.default.createElement("path", {
                            d: "M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z",
                        })
                    ),
                    "CategoryRounded"
                );
            t.default = c;
        },
    },
]);
//# sourceMappingURL=23.b2ba4a0d.chunk.js.map

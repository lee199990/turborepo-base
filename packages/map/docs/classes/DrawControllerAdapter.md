[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / DrawControllerAdapter

# Class: DrawControllerAdapter\<M\>

## Type parameters

| Name |
| :--- |
| `M`  |

## Hierarchy

-   `ControllerAdapter`\<`M`\>

    ↳ **`DrawControllerAdapter`**

## Table of contents

### Constructors

-   [constructor](DrawControllerAdapter.md#constructor)

### Properties

-   [cancel$](DrawControllerAdapter.md#cancel$)
-   [defaultStyle](DrawControllerAdapter.md#defaultstyle)
-   [drawOption](DrawControllerAdapter.md#drawoption)
-   [mapInstance](DrawControllerAdapter.md#mapinstance)
-   [result$](DrawControllerAdapter.md#result$)

### Methods

-   [begin](DrawControllerAdapter.md#begin)
-   [cancel](DrawControllerAdapter.md#cancel)
-   [circle](DrawControllerAdapter.md#circle)
-   [clear](DrawControllerAdapter.md#clear)
-   [closeModify](DrawControllerAdapter.md#closemodify)
-   [destroy](DrawControllerAdapter.md#destroy)
-   [done](DrawControllerAdapter.md#done)
-   [getControl](DrawControllerAdapter.md#getcontrol)
-   [getResult](DrawControllerAdapter.md#getresult)
-   [handleKey](DrawControllerAdapter.md#handlekey)
-   [line](DrawControllerAdapter.md#line)
-   [openModify](DrawControllerAdapter.md#openmodify)
-   [point](DrawControllerAdapter.md#point)
-   [polygon](DrawControllerAdapter.md#polygon)
-   [rectangle](DrawControllerAdapter.md#rectangle)
-   [redo](DrawControllerAdapter.md#redo)
-   [setup](DrawControllerAdapter.md#setup)
-   [trash](DrawControllerAdapter.md#trash)
-   [undo](DrawControllerAdapter.md#undo)
-   [updateLayerStyle](DrawControllerAdapter.md#updatelayerstyle)
-   [updateStyle](DrawControllerAdapter.md#updatestyle)

## Constructors

### constructor

• **new DrawControllerAdapter**\<`M`\>(`mapInstance`): [`DrawControllerAdapter`](DrawControllerAdapter.md)\<`M`\>

#### Type parameters

| Name |
| :--- |
| `M`  |

#### Parameters

| Name          | Type |
| :------------ | :--- |
| `mapInstance` | `M`  |

#### Returns

[`DrawControllerAdapter`](DrawControllerAdapter.md)\<`M`\>

#### Inherited from

ControllerAdapter\<M\>.constructor

#### Defined in

lib/controllers/base.ts:20

## Properties

### cancel$

• `Protected` **cancel$**: `Subject`\<`unknown`\>

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:19

---

### defaultStyle

• `Protected` **defaultStyle**: [`FeatureStyle`](FeatureStyle.md)

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:17

---

### drawOption

• `Protected` **drawOption**: [`DrawOption`](DrawOption.md)

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:24

---

### mapInstance

• `Protected` **mapInstance**: `M`

#### Inherited from

ControllerAdapter.mapInstance

#### Defined in

lib/controllers/base.ts:20

---

### result$

• `Protected` **result$**: `ReplaySubject`\<`Feature`\<`Geometry`, `GeoJsonProperties`\>\>

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:21

## Methods

### begin

▸ **begin**\<`D`\>(`mode`, `options?`): [`DrawControllerAdapter`](DrawControllerAdapter.md)\<`M`\>

开始新的绘图模式。

#### Type parameters

| Name | Type                                       | Description      |
| :--- | :----------------------------------------- | :--------------- |
| `D`  | extends [`DrawMode`](../enums/DrawMode.md) | 绘图模式的类型。 |

#### Parameters

| Name       | Type                                                | Description        |
| :--------- | :-------------------------------------------------- | :----------------- |
| `mode`     | `D`                                                 | 要开始的绘图模式。 |
| `options?` | `RecursivePartial`\<[`DrawOption`](DrawOption.md)\> | 可选的绘图选项。   |

#### Returns

[`DrawControllerAdapter`](DrawControllerAdapter.md)\<`M`\>

-   当前实例。

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:84

---

### cancel

▸ **cancel**(): `void`

取消当前绘制

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:195

---

### circle

▸ **circle**(`option?`): `Observable`\<`Feature`\<`Polygon`, `GeoJsonProperties`\>\>

绘制圆

#### Parameters

| Name      | Type                          | Description |
| :-------- | :---------------------------- | :---------- |
| `option?` | [`DrawOption`](DrawOption.md) | 绘制选项。  |

#### Returns

`Observable`\<`Feature`\<`Polygon`, `GeoJsonProperties`\>\>

多边形要素

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:138

---

### clear

▸ **clear**(): `void`

清空画布

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:169

---

### closeModify

▸ **closeModify**(): `void`

关闭修改模式

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:184

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Overrides

ControllerAdapter.destroy

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:200

---

### done

▸ **done**(): `void`

完成绘制，清空结果并完成监听器

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:174

---

### getControl

▸ **getControl**\<`T`\>(`key`): `undefined` \| `T`

#### Type parameters

| Name | Type        |
| :--- | :---------- |
| `T`  | `undefined` |

#### Parameters

| Name  | Type                                           |
| :---- | :--------------------------------------------- |
| `key` | [`ControllerName`](../enums/ControllerName.md) |

#### Returns

`undefined` \| `T`

#### Inherited from

ControllerAdapter.getControl

#### Defined in

lib/controllers/base.ts:22

---

### getResult

▸ **getResult**\<`G`\>(): `Observable`\<`Feature`\<`G`, `GeoJsonProperties`\>\>

监听绘制结果，返回要素

#### Type parameters

| Name | Type               |
| :--- | :----------------- |
| `G`  | extends `Geometry` |

#### Returns

`Observable`\<`Feature`\<`G`, `GeoJsonProperties`\>\>

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:62

---

### handleKey

▸ **handleKey**(`e`): `void`

内部函数，用于监听按键

#### Parameters

| Name | Type                                   |
| :--- | :------------------------------------- |
| `e`  | `Event` & `KeyboardEvent`\<`Element`\> |

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:31

---

### line

▸ **line**(`option?`): `Observable`\<`Feature`\<`LineString`, `GeoJsonProperties`\>\>

绘制线

#### Parameters

| Name      | Type                          | Description |
| :-------- | :---------------------------- | :---------- |
| `option?` | [`DrawOption`](DrawOption.md) | 绘制选项。  |

#### Returns

`Observable`\<`Feature`\<`LineString`, `GeoJsonProperties`\>\>

线要素的观察者。

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:130

---

### openModify

▸ **openModify**(`snap?`): `void`

打开修改模式

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `snap?` | `boolean` |

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:179

---

### point

▸ **point**(`option?`): `Observable`\<`Feature`\<`Point`, `GeoJsonProperties`\>\>

绘制点

#### Parameters

| Name      | Type                          | Description |
| :-------- | :---------------------------- | :---------- |
| `option?` | [`DrawOption`](DrawOption.md) | 绘制选项。  |

#### Returns

`Observable`\<`Feature`\<`Point`, `GeoJsonProperties`\>\>

点要素的观察者。

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:122

---

### polygon

▸ **polygon**(`option?`): `Observable`\<`Feature`\<`Polygon`, `GeoJsonProperties`\>\>

绘制多边形

#### Parameters

| Name      | Type                          | Description |
| :-------- | :---------------------------- | :---------- |
| `option?` | [`DrawOption`](DrawOption.md) | 绘制选项。  |

#### Returns

`Observable`\<`Feature`\<`Polygon`, `GeoJsonProperties`\>\>

多边形要素

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:146

---

### rectangle

▸ **rectangle**(`option?`): `Observable`\<`Feature`\<`Polygon`, `GeoJsonProperties`\>\>

绘制矩形

#### Parameters

| Name      | Type                          | Description |
| :-------- | :---------------------------- | :---------- |
| `option?` | [`DrawOption`](DrawOption.md) | 绘制选项。  |

#### Returns

`Observable`\<`Feature`\<`Polygon`, `GeoJsonProperties`\>\>

多边形要素

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:154

---

### redo

▸ **redo**(): `void`

重做

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:159

---

### setup

▸ **setup**(): `void`

内部函数，在地图初始化完成后调用，暴露其他控制器

#### Returns

`void`

#### Overrides

ControllerAdapter.setup

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:52

---

### trash

▸ **trash**(): `void`

编辑时删除选中的点

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:190

---

### undo

▸ **undo**(): `void`

重做

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:164

---

### updateLayerStyle

▸ **updateLayerStyle**(`style`): `any`

#### Parameters

| Name    | Type                              |
| :------ | :-------------------------------- |
| `style` | [`FeatureStyle`](FeatureStyle.md) |

#### Returns

`any`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:114

---

### updateStyle

▸ **updateStyle**(`style`): `void`

更新要素的样式。

#### Parameters

| Name    | Type                                           | Description                      |
| :------ | :--------------------------------------------- | :------------------------------- |
| `style` | `Partial`\<[`FeatureStyle`](FeatureStyle.md)\> | 包含更新样式属性的部分样式对象。 |

#### Returns

`void`

#### Defined in

lib/controllers/draw-controller/draw-controller.ts:71

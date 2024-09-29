[@jmrepo/gismap](../README.md) / [Exports](../modules.md) / LayersControllerAdapter

# Class: LayersControllerAdapter\<M, T, G\>

## Type parameters

| Name | Type                                                                                            |
| :--- | :---------------------------------------------------------------------------------------------- |
| `M`  | `M`                                                                                             |
| `T`  | extends [`LayersOperations`](LayersOperations.md) = [`LayersOperations`](LayersOperations.md)   |
| `G`  | extends [`GroupOption`](../modules.md#groupoption) = [`GroupOption`](../modules.md#groupoption) |

## Hierarchy

-   `ControllerAdapter`\<`M`\>

    ↳ **`LayersControllerAdapter`**

## Table of contents

### Constructors

-   [constructor](LayersControllerAdapter.md#constructor)

### Properties

-   [layers](LayersControllerAdapter.md#layers)
-   [mapInstance](LayersControllerAdapter.md#mapinstance)
-   [parsers](LayersControllerAdapter.md#parsers)

### Methods

-   [addLayer](LayersControllerAdapter.md#addlayer)
-   [addLayersFromMetadata](LayersControllerAdapter.md#addlayersfrommetadata)
-   [batchDisplay](LayersControllerAdapter.md#batchdisplay)
-   [createWmsLayers](LayersControllerAdapter.md#createwmslayers)
-   [createWmtsLayers](LayersControllerAdapter.md#createwmtslayers)
-   [destroy](LayersControllerAdapter.md#destroy)
-   [emptyVector](LayersControllerAdapter.md#emptyvector)
-   [getControl](LayersControllerAdapter.md#getcontrol)
-   [getLayer](LayersControllerAdapter.md#getlayer)
-   [getLayerGroup](LayersControllerAdapter.md#getlayergroup)
-   [hide](LayersControllerAdapter.md#hide)
-   [remove](LayersControllerAdapter.md#remove)
-   [separatelyShow](LayersControllerAdapter.md#separatelyshow)
-   [setup](LayersControllerAdapter.md#setup)
-   [show](LayersControllerAdapter.md#show)

## Constructors

### constructor

• **new LayersControllerAdapter
**\<`M`, `T`, `G`\>(`mapInstance`): [`LayersControllerAdapter`](LayersControllerAdapter.md)\<`M`, `T`, `G`\>

#### Type parameters

| Name | Type                                                                                                                                                                                                                      |
| :--- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `M`  | `M`                                                                                                                                                                                                                       |
| `T`  | extends [`LayersOperations`](LayersOperations.md)\<`unknown`, [`LayerOptions`](../interfaces/LayerOptions.md)\> = [`LayersOperations`](LayersOperations.md)\<`unknown`, [`LayerOptions`](../interfaces/LayerOptions.md)\> |
| `G`  | extends [`GroupOption`](../modules.md#groupoption) = [`GroupOption`](../modules.md#groupoption)                                                                                                                           |

#### Parameters

| Name          | Type |
| :------------ | :--- |
| `mapInstance` | `M`  |

#### Returns

[`LayersControllerAdapter`](LayersControllerAdapter.md)\<`M`, `T`, `G`\>

#### Inherited from

ControllerAdapter\<M\>.constructor

#### Defined in

lib/controllers/base.ts:20

## Properties

### layers

• **layers**: `Map`\<`string`, `T`\>

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:27

---

### mapInstance

• `Protected` **mapInstance**: `M`

#### Inherited from

ControllerAdapter.mapInstance

#### Defined in

lib/controllers/base.ts:20

---

### parsers

• `Protected` `Abstract` **parsers**: `Object`

#### Type declaration

| Name   | Type                                    |
| :----- | :-------------------------------------- |
| `Tms`  | [`Parser`](../modules.md#parser)\<`T`\> |
| `Wms`  | [`Parser`](../modules.md#parser)\<`T`\> |
| `Wmts` | [`Parser`](../modules.md#parser)\<`T`\> |

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:24

## Methods

### addLayer

▸ **addLayer**(`type`, `options`): `T`

添加一个具有给定选项的 Wms 类型的图层。

#### Parameters

| Name      | Type                                                | Description          |
| :-------- | :-------------------------------------------------- | :------------------- |
| `type`    | [`Wms`](../enums/LayerServerType.md#wms)            | 要添加的图层的类型。 |
| `options` | [`WmsLayerOption`](../interfaces/WmsLayerOption.md) | 图层的选项。         |

#### Returns

`T`

-   添加的图层。

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:128

▸ **addLayer**(`type`, `options`): `T`

添加一个具有给定选项的 Wmts 类型的图层。
如果需要批量添加推荐使用addLayersFromMetadata，将从元数据自动设置

#### Parameters

| Name      | Type                                                  | Description        |
| :-------- | :---------------------------------------------------- | :----------------- |
| `type`    | [`Wmts`](../enums/LayerServerType.md#wmts)            | 要添加的图层类型。 |
| `options` | [`WmtsLayerOption`](../interfaces/WmtsLayerOption.md) | 图层的选项。       |

#### Returns

`T`

-   添加的图层。

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:137

▸ **addLayer**(`type`, `options`): `T`

添加一个具有给定选项的 Tms 类型的图层。
如果添加的是公共服务如天地图，这类不统一的url，不需要填写layer,自行构造url

#### Parameters

| Name      | Type                                                | Description      |
| :-------- | :-------------------------------------------------- | :--------------- |
| `type`    | [`Tms`](../enums/LayerServerType.md#tms)            | 添加的图层类型。 |
| `options` | [`TmsLayerOption`](../interfaces/TmsLayerOption.md) | 图层的选项。     |

#### Returns

`T`

-   添加的图层。

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:147

---

### addLayersFromMetadata

▸ **addLayersFromMetadata**(`type`, `options`): `Promise`\<`string`[]\>

从指定服务的元数据中添加图层组。
从元数据中过滤出指定的layers, ID将以layer name命名
如果layers为空，则会渲染链接下所有有效的图层，警告：慎用此方式，我们无法确定哪些图层是有效的，也无法确定渲染方式是否合适

#### Parameters

| Name      | Type                                             | Description      |
| :-------- | :----------------------------------------------- | :--------------- |
| `type`    | [`LayerServerType`](../enums/LayerServerType.md) | 图层服务的类型。 |
| `options` | `G`                                              | 创建图层的选项。 |

#### Returns

`Promise`\<`string`[]\>

一个解析为图层名称数组的Promise。

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:107

---

### batchDisplay

▸ **batchDisplay**(`ids`, `show`): `void`

#### Parameters

| Name   | Type       |
| :----- | :--------- |
| `ids`  | `string`[] |
| `show` | `boolean`  |

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:184

---

### createWmsLayers

▸ **createWmsLayers**(`groupOption`): `Promise`\<`string`[]\>

为给定的分组选项创建WMS图层。

#### Parameters

| Name          | Type | Description             |
| :------------ | :--- | :---------------------- |
| `groupOption` | `G`  | 创建WMS图层的分组选项。 |

#### Returns

`Promise`\<`string`[]\>

-   一个解析为图层名称数组的Promise。

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:35

---

### createWmtsLayers

▸ **createWmtsLayers**(`groupOption`): `Promise`\<`string`[]\>

为给定的分组选项创建WMTS图层。

#### Parameters

| Name          | Type | Description             |
| :------------ | :--- | :---------------------- |
| `groupOption` | `G`  | 创建WMS图层的分组选项。 |

#### Returns

`Promise`\<`string`[]\>

-   一个解析为图层名称数组的Promise。

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:77

---

### destroy

▸ **destroy**(): `void`

#### Returns

`void`

#### Inherited from

ControllerAdapter.destroy

#### Defined in

lib/controllers/base.ts:34

---

### emptyVector

▸ **emptyVector**(`id`): `any`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `id` | `string` |

#### Returns

`any`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:237

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

### getLayer

▸ **getLayer**(`id`): `undefined` \| `T`

获取图层

#### Parameters

| Name | Type     | Description    |
| :--- | :------- | :------------- |
| `id` | `string` | 添加时的图层ID |

#### Returns

`undefined` \| `T`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:233

---

### getLayerGroup

▸ **getLayerGroup**(`groupId`): `T`[]

通过groupId获取图层组

#### Parameters

| Name      | Type     | Description |
| :-------- | :------- | :---------- |
| `groupId` | `string` | 群组ID      |

#### Returns

`T`[]

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:218

---

### hide

▸ **hide**(`id`): `void`

隐藏指定ID的图层。

#### Parameters

| Name | Type     | Description        |
| :--- | :------- | :----------------- |
| `id` | `string` | 要隐藏的图层的ID。 |

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:200

---

### remove

▸ **remove**(`id`): `void`

从地图中移除指定ID的图层。

#### Parameters

| Name | Type     | Description        |
| :--- | :------- | :----------------- |
| `id` | `string` | 要移除的图层的ID。 |

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:209

---

### separatelyShow

▸ **separatelyShow**(`id`): `void`

显示指定ID的图层。其他全部隐藏

#### Parameters

| Name | Type     | Description        |
| :--- | :------- | :----------------- |
| `id` | `string` | 要显示的图层的ID。 |

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:174

---

### setup

▸ **setup**(): `void`

控制器在地图初始化完成后将会被调用

#### Returns

`void`

#### Inherited from

ControllerAdapter.setup

#### Defined in

lib/controllers/base.ts:32

---

### show

▸ **show**(`id`): `void`

显示指定ID的图层。

#### Parameters

| Name | Type     | Description        |
| :--- | :------- | :----------------- |
| `id` | `string` | 要显示的图层的ID。 |

#### Returns

`void`

#### Defined in

lib/controllers/layer-controller/layers-controller.ts:165

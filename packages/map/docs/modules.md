[@jmrepo/gismap](README.md) / Exports

# @jmrepo/gismap

## Table of contents

### Enumerations

-   [ControllerName](enums/ControllerName.md)
-   [DrawMode](enums/DrawMode.md)
-   [LayerFormat](enums/LayerFormat.md)
-   [LayerServerType](enums/LayerServerType.md)
-   [LayerSourceType](enums/LayerSourceType.md)
-   [VectorType](enums/VectorType.md)
-   [WMSRequest](enums/WMSRequest.md)
-   [WMTSRequest](enums/WMTSRequest.md)

### Classes

-   [CustomMapLibre](classes/CustomMapLibre.md)
-   [CustomOpenLayers](classes/CustomOpenLayers.md)
-   [DrawControllerAdapter](classes/DrawControllerAdapter.md)
-   [DrawOption](classes/DrawOption.md)
-   [FeatureStyle](classes/FeatureStyle.md)
-   [GisMap](classes/GisMap.md)
-   [InitConfig](classes/InitConfig.md)
-   [LayersControllerAdapter](classes/LayersControllerAdapter.md)
-   [LayersOperations](classes/LayersOperations.md)
-   [MapManager](classes/MapManager.md)
-   [OverviewMap](classes/OverviewMap.md)
-   [Screenshot](classes/Screenshot.md)
-   [WMSParams](classes/WMSParams.md)
-   [WMTSParams](classes/WMTSParams.md)

### Interfaces

-   [LayerOptions](interfaces/LayerOptions.md)
-   [Style](interfaces/Style.md)
-   [TileMatrixLimit](interfaces/TileMatrixLimit.md)
-   [TileMatrixSetLink](interfaces/TileMatrixSetLink.md)
-   [TmsLayerOption](interfaces/TmsLayerOption.md)
-   [WMSLayerMetadata](interfaces/WMSLayerMetadata.md)
-   [WMSMetadata](interfaces/WMSMetadata.md)
-   [WMTSLayerMetadata](interfaces/WMTSLayerMetadata.md)
-   [WmsLayerOption](interfaces/WmsLayerOption.md)
-   [WmtsLayerOption](interfaces/WmtsLayerOption.md)

### Type Aliases

-   [GroupOption](modules.md#groupoption)
-   [Metadata](modules.md#metadata)
-   [Parser](modules.md#parser)
-   [RasterOption](modules.md#rasteroption)
-   [VectorOption](modules.md#vectoroption)
-   [ViewItem](modules.md#viewitem)

### Variables

-   [DrawTip](modules.md#drawtip)

### Functions

-   [createLayerOption](modules.md#createlayeroption)
-   [getLayerStyle](modules.md#getlayerstyle)
-   [getLayerTypeByFormat](modules.md#getlayertypebyformat)
-   [mergeLayerMeta](modules.md#mergelayermeta)
-   [overviewMap](modules.md#overviewmap)
-   [screenShot](modules.md#screenshot)

## Type Aliases

### GroupOption

Ƭ **GroupOption
**: \{ `groupId`: `string` ; `merge?`: `boolean` ; `subdomains?`: `string`[] ; `url`: `string` } & [`VectorOption`](modules.md#vectoroption) \| [`RasterOption`](modules.md#rasteroption)

#### Defined in

lib/controllers/layer-controller/type.ts:57

---

### Metadata

Ƭ **Metadata**: `any`

#### Defined in

lib/controllers/layer-controller/type.ts:2

---

### Parser

Ƭ **Parser**\<`T`\>: (`map`: `any`, `option`: `any`) => `T`

#### Type parameters

| Name | Type                                                                                                          |
| :--- | :------------------------------------------------------------------------------------------------------------ |
| `T`  | extends [`LayersOperations`](classes/LayersOperations.md) = [`LayersOperations`](classes/LayersOperations.md) |

#### Type declaration

• (`map`, `option`): `T`

##### Parameters

| Name     | Type  |
| :------- | :---- |
| `map`    | `any` |
| `option` | `any` |

##### Returns

`T`

#### Defined in

lib/controllers/layer-controller/layers-operations.ts:111

---

### RasterOption

Ƭ **RasterOption**: `Object`

#### Type declaration

| Name     | Type                                                                   |
| :------- | :--------------------------------------------------------------------- |
| `format` | [`Jpg`](enums/LayerFormat.md#jpg) \| [`Png`](enums/LayerFormat.md#png) |
| `layers` | `string`[]                                                             |

#### Defined in

lib/controllers/layer-controller/type.ts:52

---

### VectorOption

Ƭ **VectorOption**: `Object`

#### Type declaration

| Name     | Type                                                                           |
| :------- | :----------------------------------------------------------------------------- |
| `format` | [`Mvt`](enums/LayerFormat.md#mvt) \| [`Geojson`](enums/LayerFormat.md#geojson) |
| `view`   | [`ViewItem`](modules.md#viewitem)[]                                            |

#### Defined in

lib/controllers/layer-controller/type.ts:47

---

### ViewItem

Ƭ **ViewItem**: `Object`

#### Type declaration

| Name    | Type                                |
| :------ | :---------------------------------- |
| `name`  | `string`                            |
| `type?` | [`VectorType`](enums/VectorType.md) |

#### Defined in

lib/controllers/layer-controller/type.ts:45

## Variables

### DrawTip

• `Const` **DrawTip**: `Object`

#### Type declaration

| Name     | Type      |
| :------- | :-------- |
| `active` | `string`  |
| `idle`   | `string`  |
| `modify` | `string`  |
| `show`   | `boolean` |
| `snap`   | `string`  |

#### Defined in

lib/controllers/draw-controller/type.ts:30

## Functions

### createLayerOption

▸ **createLayerOption**(`groupOption`): `Object`

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `groupOption` | [`GroupOption`](modules.md#groupoption) |

#### Returns

`Object`

| Name         | Type                      |
| :----------- | :------------------------ |
| `groupId`    | `string`                  |
| `subdomains` | `undefined` \| `string`[] |
| `url`        | `string`                  |

#### Defined in

lib/controllers/layer-controller/layers-util.ts:45

---

### getLayerStyle

▸ **getLayerStyle**(`groupOption`): [`ViewItem`](modules.md#viewitem)[]

#### Parameters

| Name          | Type                                    |
| :------------ | :-------------------------------------- |
| `groupOption` | [`GroupOption`](modules.md#groupoption) |

#### Returns

[`ViewItem`](modules.md#viewitem)[]

#### Defined in

lib/controllers/layer-controller/layers-util.ts:32

---

### getLayerTypeByFormat

▸ **getLayerTypeByFormat**(`format`): [`LayerSourceType`](enums/LayerSourceType.md)

#### Parameters

| Name     | Type                                  |
| :------- | :------------------------------------ |
| `format` | [`LayerFormat`](enums/LayerFormat.md) |

#### Returns

[`LayerSourceType`](enums/LayerSourceType.md)

#### Defined in

lib/controllers/layer-controller/type.ts:32

---

### mergeLayerMeta

▸ **mergeLayerMeta
**\<`T`\>(`capabilitiesLayers`, `key`, `toMerge`): [`ViewItem`](modules.md#viewitem) & \{ `meta`: `T` }[]

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name                 | Type                                |
| :------------------- | :---------------------------------- |
| `capabilitiesLayers` | `T`[]                               |
| `key`                | `string`                            |
| `toMerge`            | [`ViewItem`](modules.md#viewitem)[] |

#### Returns

[`ViewItem`](modules.md#viewitem) & \{ `meta`: `T` }[]

#### Defined in

lib/controllers/layer-controller/layers-util.ts:11

---

### overviewMap

▸ **overviewMap**(`map`): [`OverviewMap`](classes/OverviewMap.md)

#### Parameters

| Name  | Type              |
| :---- | :---------------- |
| `map` | `MapInstanceType` |

#### Returns

[`OverviewMap`](classes/OverviewMap.md)

#### Defined in

lib/widget/overviewMap/OverviewMap.ts:46

---

### screenShot

▸ **screenShot**(`map`): [`Screenshot`](classes/Screenshot.md)

#### Parameters

| Name  | Type              |
| :---- | :---------------- |
| `map` | `MapInstanceType` |

#### Returns

[`Screenshot`](classes/Screenshot.md)

#### Defined in

lib/utils/screenshot/Screenshot.ts:167

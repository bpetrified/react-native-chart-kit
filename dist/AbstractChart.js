var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics = function(d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function(d, b) {
            d.__proto__ = b;
          }) ||
        function(d, b) {
          for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function(d, b) {
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
import React, { Component } from "react";
import { Defs, Line, LinearGradient, Stop, Text } from "react-native-svg";
export var DEFAULT_X_LABELS_HEIGHT_PERCENTAGE = 0.75;
var AbstractChart = /** @class */ (function(_super) {
  __extends(AbstractChart, _super);
  function AbstractChart() {
    var _this = (_super !== null && _super.apply(this, arguments)) || this;
    _this.calcScaler = function(data) {
      if (_this.props.fromZero) {
        return (
          Math.max.apply(
            Math,
            __spreadArrays(data, [0, _this.props.maxValue || 0])
          ) - Math.min.apply(Math, __spreadArrays(data, [0])) || 1
        );
      } else if (_this.props.fromNumber) {
        return (
          Math.max.apply(Math, __spreadArrays(data, [_this.props.fromNumber])) -
            Math.min.apply(
              Math,
              __spreadArrays(data, [_this.props.fromNumber])
            ) || 1
        );
      } else {
        return Math.max.apply(Math, data) - Math.min.apply(Math, data) || 1;
      }
    };
    _this.calcBaseHeight = function(data, height) {
      var min = Math.min.apply(Math, data);
      var max = Math.max.apply(
        Math,
        __spreadArrays(data, [_this.props.maxValue || 0])
      );
      if (min >= 0 && max >= 0) {
        return height;
      } else if (min < 0 && max <= 0) {
        return 0;
      } else if (min < 0 && max > 0) {
        return (height * max) / _this.calcScaler(data);
      }
    };
    _this.calcHeight = function(val, data, height) {
      var max = Math.max.apply(
        Math,
        __spreadArrays(data, [_this.props.maxValue || 0])
      );
      var min = Math.min.apply(Math, data);
      if (min < 0 && max > 0) {
        return height * (val / _this.calcScaler(data));
      } else if (min >= 0 && max >= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - min) / _this.calcScaler(data));
      } else if (min < 0 && max <= 0) {
        return _this.props.fromZero
          ? height * (val / _this.calcScaler(data))
          : height * ((val - max) / _this.calcScaler(data));
      }
    };
    _this.renderHorizontalLines = function(config) {
      var count = config.count,
        width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      var basePosition = height * verticalLabelsHeightPercentage;
      return __spreadArrays(new Array(count + 1)).map(function(_, i) {
        var y = (basePosition / count) * i + paddingTop;
        return (
          <Line
            key={Math.random()}
            x1={paddingRight}
            y1={y}
            x2={width}
            y2={y}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderHorizontalLine = function(config) {
      var width = config.width,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _a === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _a;
      return (
        <Line
          key={Math.random()}
          x1={paddingRight}
          y1={height * verticalLabelsHeightPercentage + paddingTop}
          x2={width}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderHorizontalLabels = function(config) {
      var count = config.count,
        data = config.data,
        height = config.height,
        paddingTop = config.paddingTop,
        paddingRight = config.paddingRight,
        _a = config.horizontalLabelRotation,
        horizontalLabelRotation = _a === void 0 ? 0 : _a,
        _b = config.decimalPlaces,
        decimalPlaces = _b === void 0 ? 2 : _b,
        _c = config.formatYLabel,
        formatYLabel =
          _c === void 0
            ? function(yLabel) {
                return yLabel;
              }
            : _c,
        _d = config.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _d === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _d;
      var _e = _this.props,
        _f = _e.yAxisLabel,
        yAxisLabel = _f === void 0 ? "" : _f,
        _g = _e.yAxisSuffix,
        yAxisSuffix = _g === void 0 ? "" : _g,
        _h = _e.yLabelsOffset,
        yLabelsOffset = _h === void 0 ? 12 : _h;
      return new Array(count === 1 ? 1 : count + 1).fill(1).map(function(_, i) {
        var yLabel = String(i * count);
        if (count === 1) {
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(data[0].toFixed(decimalPlaces)) +
            yAxisSuffix;
        } else {
          var label = _this.props.fromZero
            ? (_this.calcScaler(data) / count) * i +
              Math.min.apply(Math, __spreadArrays(data, [0]))
            : (_this.calcScaler(data) / count) * i + Math.min.apply(Math, data);
          yLabel =
            "" +
            yAxisLabel +
            formatYLabel(label.toFixed(decimalPlaces)) +
            yAxisSuffix;
        }
        var basePosition = height * verticalLabelsHeightPercentage;
        var x = paddingRight - yLabelsOffset;
        var y =
          count === 1 && _this.props.fromZero
            ? paddingTop + 4
            : height * verticalLabelsHeightPercentage -
              (basePosition / count) * i +
              paddingTop;
        return (
          <Text
            rotation={horizontalLabelRotation}
            origin={x + ", " + y}
            key={Math.random()}
            x={x}
            textAnchor="end"
            y={y}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForHorizontalLabels()}
          >
            {yLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLabels = function(_a) {
      var _b = _a.labels,
        labels = _b === void 0 ? [] : _b,
        width = _a.width,
        height = _a.height,
        paddingRight = _a.paddingRight,
        paddingTop = _a.paddingTop,
        _c = _a.horizontalOffset,
        horizontalOffset = _c === void 0 ? 0 : _c,
        _d = _a.stackedBar,
        stackedBar = _d === void 0 ? false : _d,
        _e = _a.verticalLabelRotation,
        verticalLabelRotation = _e === void 0 ? 0 : _e,
        _f = _a.formatXLabel,
        formatXLabel =
          _f === void 0
            ? function(xLabel) {
                return xLabel;
              }
            : _f,
        _g = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _g === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _g;
      var _h = _this.props,
        _j = _h.xAxisLabel,
        xAxisLabel = _j === void 0 ? "" : _j,
        _k = _h.xLabelsOffset,
        xLabelsOffset = _k === void 0 ? 0 : _k,
        _l = _h.hidePointsAtIndex,
        hidePointsAtIndex = _l === void 0 ? [] : _l;
      var fontSize = 12;
      var fac = 1;
      if (stackedBar) {
        fac = 0.71;
      }
      return labels.map(function(label, i) {
        if (hidePointsAtIndex.includes(i)) {
          return null;
        }
        var x =
          (((width - paddingRight) / labels.length) * i +
            paddingRight +
            horizontalOffset) *
          fac;
        var y =
          height * verticalLabelsHeightPercentage +
          paddingTop +
          fontSize * 2 +
          xLabelsOffset;
        return (
          <Text
            origin={x + ", " + y}
            rotation={verticalLabelRotation}
            key={Math.random()}
            x={x}
            y={y}
            textAnchor={verticalLabelRotation === 0 ? "middle" : "start"}
            {..._this.getPropsForLabels()}
            {..._this.getPropsForVerticalLabels()}
          >
            {"" + formatXLabel(label) + xAxisLabel}
          </Text>
        );
      });
    };
    _this.renderVerticalLines = function(_a) {
      var data = _a.data,
        width = _a.width,
        height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      var _c = _this.props.yAxisInterval,
        yAxisInterval = _c === void 0 ? 1 : _c;
      return __spreadArrays(
        new Array(Math.ceil(data.length / yAxisInterval))
      ).map(function(_, i) {
        return (
          <Line
            key={Math.random()}
            x1={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y1={0}
            x2={Math.floor(
              ((width - paddingRight) / (data.length / yAxisInterval)) * i +
                paddingRight
            )}
            y2={height * verticalLabelsHeightPercentage + paddingTop}
            {..._this.getPropsForBackgroundLines()}
          />
        );
      });
    };
    _this.renderVerticalLine = function(_a) {
      var height = _a.height,
        paddingTop = _a.paddingTop,
        paddingRight = _a.paddingRight,
        _b = _a.verticalLabelsHeightPercentage,
        verticalLabelsHeightPercentage =
          _b === void 0 ? DEFAULT_X_LABELS_HEIGHT_PERCENTAGE : _b;
      return (
        <Line
          key={Math.random()}
          x1={Math.floor(paddingRight)}
          y1={0}
          x2={Math.floor(paddingRight)}
          y2={height * verticalLabelsHeightPercentage + paddingTop}
          {..._this.getPropsForBackgroundLines()}
        />
      );
    };
    _this.renderDefs = function(config) {
      var width = config.width,
        height = config.height,
        backgroundGradientFrom = config.backgroundGradientFrom,
        backgroundGradientTo = config.backgroundGradientTo,
        useShadowColorFromDataset = config.useShadowColorFromDataset,
        data = config.data;
      var fromOpacity = config.hasOwnProperty("backgroundGradientFromOpacity")
        ? config.backgroundGradientFromOpacity
        : 1.0;
      var toOpacity = config.hasOwnProperty("backgroundGradientToOpacity")
        ? config.backgroundGradientToOpacity
        : 1.0;
      var fillShadowGradient = config.hasOwnProperty("fillShadowGradient")
        ? config.fillShadowGradient
        : _this.props.chartConfig.color(1.0);
      var fillShadowGradientOpacity = config.hasOwnProperty(
        "fillShadowGradientOpacity"
      )
        ? config.fillShadowGradientOpacity
        : 0.1;
      return (
        <Defs>
          <LinearGradient
            id="backgroundGradient"
            x1={0}
            y1={height}
            x2={width}
            y2={0}
            gradientUnits="userSpaceOnUse"
          >
            <Stop
              offset="0"
              stopColor={backgroundGradientFrom}
              stopOpacity={fromOpacity}
            />
            <Stop
              offset="1"
              stopColor={backgroundGradientTo}
              stopOpacity={toOpacity}
            />
          </LinearGradient>
          {useShadowColorFromDataset ? (
            data.map(function(dataset, index) {
              return (
                <LinearGradient
                  id={"fillShadowGradient_" + index}
                  key={"" + index}
                  x1={0}
                  y1={0}
                  x2={0}
                  y2={height}
                  gradientUnits="userSpaceOnUse"
                >
                  <Stop
                    offset="0"
                    stopColor={
                      dataset.color ? dataset.color(1.0) : fillShadowGradient
                    }
                    stopOpacity={fillShadowGradientOpacity}
                  />
                  <Stop
                    offset="1"
                    stopColor={
                      dataset.color
                        ? dataset.color(fillShadowGradientOpacity)
                        : fillShadowGradient
                    }
                    stopOpacity="0"
                  />
                </LinearGradient>
              );
            })
          ) : (
            <LinearGradient
              id="fillShadowGradient"
              x1={0}
              y1={0}
              x2={0}
              y2={height}
              gradientUnits="userSpaceOnUse"
            >
              <Stop
                offset="0"
                stopColor={fillShadowGradient}
                stopOpacity={fillShadowGradientOpacity}
              />
              <Stop offset="1" stopColor={fillShadowGradient} stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>
      );
    };
    return _this;
  }
  AbstractChart.prototype.getPropsForBackgroundLines = function() {
    var _a = this.props.chartConfig.propsForBackgroundLines,
      propsForBackgroundLines = _a === void 0 ? {} : _a;
    return __assign(
      {
        stroke: this.props.chartConfig.color(0.2),
        strokeDasharray: "5, 10",
        strokeWidth: 1
      },
      propsForBackgroundLines
    );
  };
  AbstractChart.prototype.getPropsForLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForLabels,
      propsForLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fontSize: 12, fill: labelColor(0.8) }, propsForLabels);
  };
  AbstractChart.prototype.getPropsForVerticalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForVerticalLabels,
      propsForVerticalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForVerticalLabels);
  };
  AbstractChart.prototype.getPropsForHorizontalLabels = function() {
    var _a = this.props.chartConfig,
      _b = _a.propsForHorizontalLabels,
      propsForHorizontalLabels = _b === void 0 ? {} : _b,
      color = _a.color,
      _c = _a.labelColor,
      labelColor = _c === void 0 ? color : _c;
    return __assign({ fill: labelColor(0.8) }, propsForHorizontalLabels);
  };
  return AbstractChart;
})(Component);
export default AbstractChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWJzdHJhY3RDaGFydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9BYnN0cmFjdENoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxPQUFPLENBQUM7QUFDekMsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXFDMUUsTUFBTSxDQUFDLElBQU0sa0NBQWtDLEdBQUcsSUFBSSxDQUFDO0FBRXZEO0lBR1UsaUNBQW1FO0lBSDdFO1FBQUEscUVBa2NDO1FBOWJDLGdCQUFVLEdBQUcsVUFBQyxJQUFjO1lBQzFCLElBQUksS0FBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGlCQUFRLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBSSxJQUFJLENBQUMsR0FBRyxPQUFSLElBQUksaUJBQVEsSUFBSSxHQUFFLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQzthQUNyRjtpQkFBTSxJQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUNoQyxPQUFPLENBQ0wsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGlCQUFRLElBQUksR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsTUFDckMsSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLGlCQUFRLElBQUksR0FBRSxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxJQUFJLENBQUMsQ0FDaEQsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLEdBQUcsT0FBUixJQUFJLEVBQVEsSUFBSSxJQUFJLElB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Q0FBQyxJQUNsQix3QkFBd0IsRUFDM0I7SUFDSixDQUFDO0lBdVdILG9CQUFDO0FBQUQsQ0FBQyxBQWxjRCxDQUdVLFNBQVMsR0ErYmxCO0FBRUQsZUFBZSxhQUFhLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBEZWZzLCBMaW5lLCBMaW5lYXJHcmFkaWVudCwgU3RvcCwgVGV4dCB9IGZyb20gXCJyZWFjdC1uYXRpdmUtc3ZnXCI7XG5cbmltcG9ydCB7IENoYXJ0Q29uZmlnLCBEYXRhc2V0LCBQYXJ0aWFsQnkgfSBmcm9tIFwiLi9IZWxwZXJUeXBlc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFic3RyYWN0Q2hhcnRQcm9wcyB7XG4gIGZyb21aZXJvPzogYm9vbGVhbjtcbiAgZnJvbU51bWJlcj86IG51bWJlcjtcbiAgY2hhcnRDb25maWc/OiBBYnN0cmFjdENoYXJ0Q29uZmlnO1xuICB5QXhpc0xhYmVsPzogc3RyaW5nO1xuICB5QXhpc1N1ZmZpeD86IHN0cmluZztcbiAgeUxhYmVsc09mZnNldD86IG51bWJlcjtcbiAgeUF4aXNJbnRlcnZhbD86IG51bWJlcjtcbiAgeEF4aXNMYWJlbD86IHN0cmluZztcbiAgeExhYmVsc09mZnNldD86IG51bWJlcjtcbiAgaGlkZVBvaW50c0F0SW5kZXg/OiBudW1iZXJbXTtcbiAgbWF4VmFsdWU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWJzdHJhY3RDaGFydENvbmZpZyBleHRlbmRzIENoYXJ0Q29uZmlnIHtcbiAgY291bnQ/OiBudW1iZXI7XG4gIGRhdGE/OiBEYXRhc2V0W107XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIHBhZGRpbmdUb3A/OiBudW1iZXI7XG4gIHBhZGRpbmdSaWdodD86IG51bWJlcjtcbiAgaG9yaXpvbnRhbExhYmVsUm90YXRpb24/OiBudW1iZXI7XG4gIGZvcm1hdFlMYWJlbD86ICh5TGFiZWw6IHN0cmluZykgPT4gc3RyaW5nO1xuICBsYWJlbHM/OiBzdHJpbmdbXTtcbiAgaG9yaXpvbnRhbE9mZnNldD86IG51bWJlcjtcbiAgc3RhY2tlZEJhcj86IGJvb2xlYW47XG4gIHZlcnRpY2FsTGFiZWxSb3RhdGlvbj86IG51bWJlcjtcbiAgZm9ybWF0WExhYmVsPzogKHhMYWJlbDogc3RyaW5nKSA9PiBzdHJpbmc7XG4gIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZT86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQWJzdHJhY3RDaGFydFN0YXRlID0ge307XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFID0gMC43NTtcblxuY2xhc3MgQWJzdHJhY3RDaGFydDxcbiAgSVByb3BzIGV4dGVuZHMgQWJzdHJhY3RDaGFydFByb3BzLFxuICBJU3RhdGUgZXh0ZW5kcyBBYnN0cmFjdENoYXJ0U3RhdGVcbj4gZXh0ZW5kcyBDb21wb25lbnQ8QWJzdHJhY3RDaGFydFByb3BzICYgSVByb3BzLCBBYnN0cmFjdENoYXJ0U3RhdGUgJiBJU3RhdGU+IHtcbiAgY2FsY1NjYWxlciA9IChkYXRhOiBudW1iZXJbXSkgPT4ge1xuICAgIGlmICh0aGlzLnByb3BzLmZyb21aZXJvKSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSwgMCwgKHRoaXMucHJvcHMubWF4VmFsdWUgfHwgMCkpIC0gTWF0aC5taW4oLi4uZGF0YSwgMCkgfHwgMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZnJvbU51bWJlcikge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgTWF0aC5tYXgoLi4uZGF0YSwgdGhpcy5wcm9wcy5mcm9tTnVtYmVyKSAtXG4gICAgICAgICAgTWF0aC5taW4oLi4uZGF0YSwgdGhpcy5wcm9wcy5mcm9tTnVtYmVyKSB8fCAxXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5tYXgoLi4uZGF0YSkgLSBNYXRoLm1pbiguLi5kYXRhKSB8fCAxO1xuICAgIH1cbiAgfTtcblxuICBjYWxjQmFzZUhlaWdodCA9IChkYXRhOiBudW1iZXJbXSwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhKTtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhLCAodGhpcy5wcm9wcy5tYXhWYWx1ZSB8fCAwKSk7XG4gICAgaWYgKG1pbiA+PSAwICYmIG1heCA+PSAwKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSBlbHNlIGlmIChtaW4gPCAwICYmIG1heCA+IDApIHtcbiAgICAgIHJldHVybiAoaGVpZ2h0ICogbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKTtcbiAgICB9XG4gIH07XG5cbiAgY2FsY0hlaWdodCA9ICh2YWw6IG51bWJlciwgZGF0YTogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoLi4uZGF0YSwgKHRoaXMucHJvcHMubWF4VmFsdWUgfHwgMCkpO1xuICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKC4uLmRhdGEpO1xuXG4gICAgaWYgKG1pbiA8IDAgJiYgbWF4ID4gMCkge1xuICAgICAgcmV0dXJuIGhlaWdodCAqICh2YWwgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xuICAgIH0gZWxzZSBpZiAobWluID49IDAgJiYgbWF4ID49IDApIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLmZyb21aZXJvXG4gICAgICAgID8gaGVpZ2h0ICogKHZhbCAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSlcbiAgICAgICAgOiBoZWlnaHQgKiAoKHZhbCAtIG1pbikgLyB0aGlzLmNhbGNTY2FsZXIoZGF0YSkpO1xuICAgIH0gZWxzZSBpZiAobWluIDwgMCAmJiBtYXggPD0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZnJvbVplcm9cbiAgICAgICAgPyBoZWlnaHQgKiAodmFsIC8gdGhpcy5jYWxjU2NhbGVyKGRhdGEpKVxuICAgICAgICA6IGhlaWdodCAqICgodmFsIC0gbWF4KSAvIHRoaXMuY2FsY1NjYWxlcihkYXRhKSk7XG4gICAgfVxuICB9O1xuXG4gIGdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCkge1xuICAgIGNvbnN0IHsgcHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMgPSB7fSB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcbiAgICByZXR1cm4ge1xuICAgICAgc3Ryb2tlOiB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnLmNvbG9yKDAuMiksXG4gICAgICBzdHJva2VEYXNoYXJyYXk6IFwiNSwgMTBcIixcbiAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgLi4ucHJvcHNGb3JCYWNrZ3JvdW5kTGluZXNcbiAgICB9O1xuICB9XG5cbiAgZ2V0UHJvcHNGb3JMYWJlbHMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHNGb3JMYWJlbHMgPSB7fSxcbiAgICAgIGNvbG9yLFxuICAgICAgbGFiZWxDb2xvciA9IGNvbG9yXG4gICAgfSA9IHRoaXMucHJvcHMuY2hhcnRDb25maWc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgIGZpbGw6IGxhYmVsQ29sb3IoMC44KSxcbiAgICAgIC4uLnByb3BzRm9yTGFiZWxzXG4gICAgfTtcbiAgfVxuXG4gIGdldFByb3BzRm9yVmVydGljYWxMYWJlbHMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHNGb3JWZXJ0aWNhbExhYmVscyA9IHt9LFxuICAgICAgY29sb3IsXG4gICAgICBsYWJlbENvbG9yID0gY29sb3JcbiAgICB9ID0gdGhpcy5wcm9wcy5jaGFydENvbmZpZztcbiAgICByZXR1cm4ge1xuICAgICAgZmlsbDogbGFiZWxDb2xvcigwLjgpLFxuICAgICAgLi4ucHJvcHNGb3JWZXJ0aWNhbExhYmVsc1xuICAgIH07XG4gIH1cblxuICBnZXRQcm9wc0Zvckhvcml6b250YWxMYWJlbHMoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzID0ge30sXG4gICAgICBjb2xvcixcbiAgICAgIGxhYmVsQ29sb3IgPSBjb2xvclxuICAgIH0gPSB0aGlzLnByb3BzLmNoYXJ0Q29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICBmaWxsOiBsYWJlbENvbG9yKDAuOCksXG4gICAgICAuLi5wcm9wc0Zvckhvcml6b250YWxMYWJlbHNcbiAgICB9O1xuICB9XG5cbiAgcmVuZGVySG9yaXpvbnRhbExpbmVzID0gY29uZmlnID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBjb3VudCxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcGFkZGluZ1RvcCxcbiAgICAgIHBhZGRpbmdSaWdodCxcbiAgICAgIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSA9IERFRkFVTFRfWF9MQUJFTFNfSEVJR0hUX1BFUkNFTlRBR0VcbiAgICB9ID0gY29uZmlnO1xuICAgIGNvbnN0IGJhc2VQb3NpdGlvbiA9IGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZTtcblxuICAgIHJldHVybiBbLi4ubmV3IEFycmF5KGNvdW50ICsgMSldLm1hcCgoXywgaSkgPT4ge1xuICAgICAgY29uc3QgeSA9IChiYXNlUG9zaXRpb24gLyBjb3VudCkgKiBpICsgcGFkZGluZ1RvcDtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxMaW5lXG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICAgIHgxPXtwYWRkaW5nUmlnaHR9XG4gICAgICAgICAgeTE9e3l9XG4gICAgICAgICAgeDI9e3dpZHRofVxuICAgICAgICAgIHkyPXt5fVxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yQmFja2dyb3VuZExpbmVzKCl9XG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlckhvcml6b250YWxMaW5lID0gY29uZmlnID0+IHtcbiAgICBjb25zdCB7XG4gICAgICB3aWR0aCxcbiAgICAgIGhlaWdodCxcbiAgICAgIHBhZGRpbmdUb3AsXG4gICAgICBwYWRkaW5nUmlnaHQsXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXG4gICAgfSA9IGNvbmZpZztcbiAgICByZXR1cm4gKFxuICAgICAgPExpbmVcbiAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICB4MT17cGFkZGluZ1JpZ2h0fVxuICAgICAgICB5MT17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cbiAgICAgICAgeDI9e3dpZHRofVxuICAgICAgICB5Mj17aGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlICsgcGFkZGluZ1RvcH1cbiAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICByZW5kZXJIb3Jpem9udGFsTGFiZWxzID0gKFxuICAgIGNvbmZpZzogT21pdDxBYnN0cmFjdENoYXJ0Q29uZmlnLCBcImRhdGFcIj4gJiB7IGRhdGE6IG51bWJlcltdIH1cbiAgKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgY291bnQsXG4gICAgICBkYXRhLFxuICAgICAgaGVpZ2h0LFxuICAgICAgcGFkZGluZ1RvcCxcbiAgICAgIHBhZGRpbmdSaWdodCxcbiAgICAgIGhvcml6b250YWxMYWJlbFJvdGF0aW9uID0gMCxcbiAgICAgIGRlY2ltYWxQbGFjZXMgPSAyLFxuICAgICAgZm9ybWF0WUxhYmVsID0gKHlMYWJlbDogc3RyaW5nKSA9PiB5TGFiZWwsXG4gICAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXG4gICAgfSA9IGNvbmZpZztcblxuICAgIGNvbnN0IHtcbiAgICAgIHlBeGlzTGFiZWwgPSBcIlwiLFxuICAgICAgeUF4aXNTdWZmaXggPSBcIlwiLFxuICAgICAgeUxhYmVsc09mZnNldCA9IDEyXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIG5ldyBBcnJheShjb3VudCA9PT0gMSA/IDEgOiBjb3VudCArIDEpLmZpbGwoMSkubWFwKChfLCBpKSA9PiB7XG4gICAgICBsZXQgeUxhYmVsID0gU3RyaW5nKGkgKiBjb3VudCk7XG5cbiAgICAgIGlmIChjb3VudCA9PT0gMSkge1xuICAgICAgICB5TGFiZWwgPSBgJHt5QXhpc0xhYmVsfSR7Zm9ybWF0WUxhYmVsKFxuICAgICAgICAgIGRhdGFbMF0udG9GaXhlZChkZWNpbWFsUGxhY2VzKVxuICAgICAgICApfSR7eUF4aXNTdWZmaXh9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGxhYmVsID0gdGhpcy5wcm9wcy5mcm9tWmVyb1xuICAgICAgICAgID8gKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhLCAwKVxuICAgICAgICAgIDogKHRoaXMuY2FsY1NjYWxlcihkYXRhKSAvIGNvdW50KSAqIGkgKyBNYXRoLm1pbiguLi5kYXRhKTtcbiAgICAgICAgeUxhYmVsID0gYCR7eUF4aXNMYWJlbH0ke2Zvcm1hdFlMYWJlbChcbiAgICAgICAgICBsYWJlbC50b0ZpeGVkKGRlY2ltYWxQbGFjZXMpXG4gICAgICAgICl9JHt5QXhpc1N1ZmZpeH1gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXNlUG9zaXRpb24gPSBoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2U7XG4gICAgICBjb25zdCB4ID0gcGFkZGluZ1JpZ2h0IC0geUxhYmVsc09mZnNldDtcbiAgICAgIGNvbnN0IHkgPVxuICAgICAgICBjb3VudCA9PT0gMSAmJiB0aGlzLnByb3BzLmZyb21aZXJvXG4gICAgICAgICAgPyBwYWRkaW5nVG9wICsgNFxuICAgICAgICAgIDogaGVpZ2h0ICogdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlIC1cbiAgICAgICAgICAgIChiYXNlUG9zaXRpb24gLyBjb3VudCkgKiBpICtcbiAgICAgICAgICAgIHBhZGRpbmdUb3A7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGV4dFxuICAgICAgICAgIHJvdGF0aW9uPXtob3Jpem9udGFsTGFiZWxSb3RhdGlvbn1cbiAgICAgICAgICBvcmlnaW49e2Ake3h9LCAke3l9YH1cbiAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgeD17eH1cbiAgICAgICAgICB0ZXh0QW5jaG9yPVwiZW5kXCJcbiAgICAgICAgICB5PXt5fVxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JIb3Jpem9udGFsTGFiZWxzKCl9XG4gICAgICAgID5cbiAgICAgICAgICB7eUxhYmVsfVxuICAgICAgICA8L1RleHQ+XG4gICAgICApO1xuICAgIH0pO1xuICB9O1xuXG4gIHJlbmRlclZlcnRpY2FsTGFiZWxzID0gKHtcbiAgICBsYWJlbHMgPSBbXSxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgcGFkZGluZ1JpZ2h0LFxuICAgIHBhZGRpbmdUb3AsXG4gICAgaG9yaXpvbnRhbE9mZnNldCA9IDAsXG4gICAgc3RhY2tlZEJhciA9IGZhbHNlLFxuICAgIHZlcnRpY2FsTGFiZWxSb3RhdGlvbiA9IDAsXG4gICAgZm9ybWF0WExhYmVsID0geExhYmVsID0+IHhMYWJlbCxcbiAgICB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgPSBERUZBVUxUX1hfTEFCRUxTX0hFSUdIVF9QRVJDRU5UQUdFXG4gIH06IFBpY2s8XG4gICAgQWJzdHJhY3RDaGFydENvbmZpZyxcbiAgICB8IFwibGFiZWxzXCJcbiAgICB8IFwid2lkdGhcIlxuICAgIHwgXCJoZWlnaHRcIlxuICAgIHwgXCJwYWRkaW5nUmlnaHRcIlxuICAgIHwgXCJwYWRkaW5nVG9wXCJcbiAgICB8IFwiaG9yaXpvbnRhbE9mZnNldFwiXG4gICAgfCBcInN0YWNrZWRCYXJcIlxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsUm90YXRpb25cIlxuICAgIHwgXCJmb3JtYXRYTGFiZWxcIlxuICAgIHwgXCJ2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2VcIlxuICA+KSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgeEF4aXNMYWJlbCA9IFwiXCIsXG4gICAgICB4TGFiZWxzT2Zmc2V0ID0gMCxcbiAgICAgIGhpZGVQb2ludHNBdEluZGV4ID0gW11cbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGZvbnRTaXplID0gMTI7XG5cbiAgICBsZXQgZmFjID0gMTtcbiAgICBpZiAoc3RhY2tlZEJhcikge1xuICAgICAgZmFjID0gMC43MTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGFiZWxzLm1hcCgobGFiZWwsIGkpID0+IHtcbiAgICAgIGlmIChoaWRlUG9pbnRzQXRJbmRleC5pbmNsdWRlcyhpKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeCA9XG4gICAgICAgICgoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIGxhYmVscy5sZW5ndGgpICogaSArXG4gICAgICAgICAgcGFkZGluZ1JpZ2h0ICtcbiAgICAgICAgICBob3Jpem9udGFsT2Zmc2V0KSAqXG4gICAgICAgIGZhYztcblxuICAgICAgY29uc3QgeSA9XG4gICAgICAgIGhlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArXG4gICAgICAgIHBhZGRpbmdUb3AgK1xuICAgICAgICBmb250U2l6ZSAqIDIgK1xuICAgICAgICB4TGFiZWxzT2Zmc2V0O1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGV4dFxuICAgICAgICAgIG9yaWdpbj17YCR7eH0sICR7eX1gfVxuICAgICAgICAgIHJvdGF0aW9uPXt2ZXJ0aWNhbExhYmVsUm90YXRpb259XG4gICAgICAgICAga2V5PXtNYXRoLnJhbmRvbSgpfVxuICAgICAgICAgIHg9e3h9XG4gICAgICAgICAgeT17eX1cbiAgICAgICAgICB0ZXh0QW5jaG9yPXt2ZXJ0aWNhbExhYmVsUm90YXRpb24gPT09IDAgPyBcIm1pZGRsZVwiIDogXCJzdGFydFwifVxuICAgICAgICAgIHsuLi50aGlzLmdldFByb3BzRm9yTGFiZWxzKCl9XG4gICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JWZXJ0aWNhbExhYmVscygpfVxuICAgICAgICA+XG4gICAgICAgICAge2Ake2Zvcm1hdFhMYWJlbChsYWJlbCl9JHt4QXhpc0xhYmVsfWB9XG4gICAgICAgIDwvVGV4dD5cbiAgICAgICk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmVuZGVyVmVydGljYWxMaW5lcyA9ICh7XG4gICAgZGF0YSxcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgcGFkZGluZ1RvcCxcbiAgICBwYWRkaW5nUmlnaHQsXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxuICB9OiBPbWl0PFxuICAgIFBpY2s8XG4gICAgICBBYnN0cmFjdENoYXJ0Q29uZmlnLFxuICAgICAgfCBcImRhdGFcIlxuICAgICAgfCBcIndpZHRoXCJcbiAgICAgIHwgXCJoZWlnaHRcIlxuICAgICAgfCBcInBhZGRpbmdSaWdodFwiXG4gICAgICB8IFwicGFkZGluZ1RvcFwiXG4gICAgICB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcbiAgICA+LFxuICAgIFwiZGF0YVwiXG4gID4gJiB7IGRhdGE6IG51bWJlcltdIH0pID0+IHtcbiAgICBjb25zdCB7IHlBeGlzSW50ZXJ2YWwgPSAxIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIFsuLi5uZXcgQXJyYXkoTWF0aC5jZWlsKGRhdGEubGVuZ3RoIC8geUF4aXNJbnRlcnZhbCkpXS5tYXAoXG4gICAgICAoXywgaSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxMaW5lXG4gICAgICAgICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICAgICAgICB4MT17TWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgKCh3aWR0aCAtIHBhZGRpbmdSaWdodCkgLyAoZGF0YS5sZW5ndGggLyB5QXhpc0ludGVydmFsKSkgKiBpICtcbiAgICAgICAgICAgICAgICBwYWRkaW5nUmlnaHRcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICB5MT17MH1cbiAgICAgICAgICAgIHgyPXtNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAoKHdpZHRoIC0gcGFkZGluZ1JpZ2h0KSAvIChkYXRhLmxlbmd0aCAvIHlBeGlzSW50ZXJ2YWwpKSAqIGkgK1xuICAgICAgICAgICAgICAgIHBhZGRpbmdSaWdodFxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHkyPXtoZWlnaHQgKiB2ZXJ0aWNhbExhYmVsc0hlaWdodFBlcmNlbnRhZ2UgKyBwYWRkaW5nVG9wfVxuICAgICAgICAgICAgey4uLnRoaXMuZ2V0UHJvcHNGb3JCYWNrZ3JvdW5kTGluZXMoKX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfVxuICAgICk7XG4gIH07XG5cbiAgcmVuZGVyVmVydGljYWxMaW5lID0gKHtcbiAgICBoZWlnaHQsXG4gICAgcGFkZGluZ1RvcCxcbiAgICBwYWRkaW5nUmlnaHQsXG4gICAgdmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlID0gREVGQVVMVF9YX0xBQkVMU19IRUlHSFRfUEVSQ0VOVEFHRVxuICB9OiBQaWNrPFxuICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXG4gICAgXCJoZWlnaHRcIiB8IFwicGFkZGluZ1JpZ2h0XCIgfCBcInBhZGRpbmdUb3BcIiB8IFwidmVydGljYWxMYWJlbHNIZWlnaHRQZXJjZW50YWdlXCJcbiAgPikgPT4gKFxuICAgIDxMaW5lXG4gICAgICBrZXk9e01hdGgucmFuZG9tKCl9XG4gICAgICB4MT17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxuICAgICAgeTE9ezB9XG4gICAgICB4Mj17TWF0aC5mbG9vcihwYWRkaW5nUmlnaHQpfVxuICAgICAgeTI9e2hlaWdodCAqIHZlcnRpY2FsTGFiZWxzSGVpZ2h0UGVyY2VudGFnZSArIHBhZGRpbmdUb3B9XG4gICAgICB7Li4udGhpcy5nZXRQcm9wc0ZvckJhY2tncm91bmRMaW5lcygpfVxuICAgIC8+XG4gICk7XG5cbiAgcmVuZGVyRGVmcyA9IChcbiAgICBjb25maWc6IFBpY2s8XG4gICAgICBQYXJ0aWFsQnk8XG4gICAgICAgIEFic3RyYWN0Q2hhcnRDb25maWcsXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiXG4gICAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb09wYWNpdHlcIlxuICAgICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcbiAgICAgICAgfCBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxuICAgICAgPixcbiAgICAgIHwgXCJ3aWR0aFwiXG4gICAgICB8IFwiaGVpZ2h0XCJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tXCJcbiAgICAgIHwgXCJiYWNrZ3JvdW5kR3JhZGllbnRUb1wiXG4gICAgICB8IFwidXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldFwiXG4gICAgICB8IFwiZGF0YVwiXG4gICAgICB8IFwiYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcIlxuICAgICAgfCBcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiXG4gICAgICB8IFwiZmlsbFNoYWRvd0dyYWRpZW50XCJcbiAgICAgIHwgXCJmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5XCJcbiAgICA+XG4gICkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgYmFja2dyb3VuZEdyYWRpZW50RnJvbSxcbiAgICAgIGJhY2tncm91bmRHcmFkaWVudFRvLFxuICAgICAgdXNlU2hhZG93Q29sb3JGcm9tRGF0YXNldCxcbiAgICAgIGRhdGFcbiAgICB9ID0gY29uZmlnO1xuXG4gICAgY29uc3QgZnJvbU9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXCJiYWNrZ3JvdW5kR3JhZGllbnRGcm9tT3BhY2l0eVwiKVxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50RnJvbU9wYWNpdHlcbiAgICAgIDogMS4wO1xuICAgIGNvbnN0IHRvT3BhY2l0eSA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImJhY2tncm91bmRHcmFkaWVudFRvT3BhY2l0eVwiKVxuICAgICAgPyBjb25maWcuYmFja2dyb3VuZEdyYWRpZW50VG9PcGFjaXR5XG4gICAgICA6IDEuMDtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudCA9IGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShcImZpbGxTaGFkb3dHcmFkaWVudFwiKVxuICAgICAgPyBjb25maWcuZmlsbFNoYWRvd0dyYWRpZW50XG4gICAgICA6IHRoaXMucHJvcHMuY2hhcnRDb25maWcuY29sb3IoMS4wKTtcblxuICAgIGNvbnN0IGZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHkgPSBjb25maWcuaGFzT3duUHJvcGVydHkoXG4gICAgICBcImZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcIlxuICAgIClcbiAgICAgID8gY29uZmlnLmZpbGxTaGFkb3dHcmFkaWVudE9wYWNpdHlcbiAgICAgIDogMC4xO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxEZWZzPlxuICAgICAgICA8TGluZWFyR3JhZGllbnRcbiAgICAgICAgICBpZD1cImJhY2tncm91bmRHcmFkaWVudFwiXG4gICAgICAgICAgeDE9ezB9XG4gICAgICAgICAgeTE9e2hlaWdodH1cbiAgICAgICAgICB4Mj17d2lkdGh9XG4gICAgICAgICAgeTI9ezB9XG4gICAgICAgICAgZ3JhZGllbnRVbml0cz1cInVzZXJTcGFjZU9uVXNlXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxTdG9wXG4gICAgICAgICAgICBvZmZzZXQ9XCIwXCJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50RnJvbX1cbiAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmcm9tT3BhY2l0eX1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxTdG9wXG4gICAgICAgICAgICBvZmZzZXQ9XCIxXCJcbiAgICAgICAgICAgIHN0b3BDb2xvcj17YmFja2dyb3VuZEdyYWRpZW50VG99XG4gICAgICAgICAgICBzdG9wT3BhY2l0eT17dG9PcGFjaXR5fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvTGluZWFyR3JhZGllbnQ+XG4gICAgICAgIHt1c2VTaGFkb3dDb2xvckZyb21EYXRhc2V0ID8gKFxuICAgICAgICAgIGRhdGEubWFwKChkYXRhc2V0LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgPExpbmVhckdyYWRpZW50XG4gICAgICAgICAgICAgIGlkPXtgZmlsbFNoYWRvd0dyYWRpZW50XyR7aW5kZXh9YH1cbiAgICAgICAgICAgICAga2V5PXtgJHtpbmRleH1gfVxuICAgICAgICAgICAgICB4MT17MH1cbiAgICAgICAgICAgICAgeTE9ezB9XG4gICAgICAgICAgICAgIHgyPXswfVxuICAgICAgICAgICAgICB5Mj17aGVpZ2h0fVxuICAgICAgICAgICAgICBncmFkaWVudFVuaXRzPVwidXNlclNwYWNlT25Vc2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgICAgIG9mZnNldD1cIjBcIlxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yID8gZGF0YXNldC5jb2xvcigxLjApIDogZmlsbFNoYWRvd0dyYWRpZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0b3BPcGFjaXR5PXtmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8U3RvcFxuICAgICAgICAgICAgICAgIG9mZnNldD1cIjFcIlxuICAgICAgICAgICAgICAgIHN0b3BDb2xvcj17XG4gICAgICAgICAgICAgICAgICBkYXRhc2V0LmNvbG9yXG4gICAgICAgICAgICAgICAgICAgID8gZGF0YXNldC5jb2xvcihmaWxsU2hhZG93R3JhZGllbnRPcGFjaXR5KVxuICAgICAgICAgICAgICAgICAgICA6IGZpbGxTaGFkb3dHcmFkaWVudFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdG9wT3BhY2l0eT1cIjBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cbiAgICAgICAgICApKVxuICAgICAgICApIDogKFxuICAgICAgICAgIDxMaW5lYXJHcmFkaWVudFxuICAgICAgICAgICAgaWQ9XCJmaWxsU2hhZG93R3JhZGllbnRcIlxuICAgICAgICAgICAgeDE9ezB9XG4gICAgICAgICAgICB5MT17MH1cbiAgICAgICAgICAgIHgyPXswfVxuICAgICAgICAgICAgeTI9e2hlaWdodH1cbiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFN0b3BcbiAgICAgICAgICAgICAgb2Zmc2V0PVwiMFwiXG4gICAgICAgICAgICAgIHN0b3BDb2xvcj17ZmlsbFNoYWRvd0dyYWRpZW50fVxuICAgICAgICAgICAgICBzdG9wT3BhY2l0eT17ZmlsbFNoYWRvd0dyYWRpZW50T3BhY2l0eX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U3RvcCBvZmZzZXQ9XCIxXCIgc3RvcENvbG9yPXtmaWxsU2hhZG93R3JhZGllbnR9IHN0b3BPcGFjaXR5PVwiMFwiIC8+XG4gICAgICAgICAgPC9MaW5lYXJHcmFkaWVudD5cbiAgICAgICAgKX1cbiAgICAgIDwvRGVmcz5cbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBBYnN0cmFjdENoYXJ0O1xuIl19

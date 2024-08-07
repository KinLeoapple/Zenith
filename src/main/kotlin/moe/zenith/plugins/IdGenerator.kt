package moe.zenith.plugins

import com.github.yitter.contract.IdGeneratorOptions
import com.github.yitter.idgen.YitIdHelper

fun configureIdGenerator() {
    val options by lazy { IdGeneratorOptions() }
    options.WorkerIdBitLength = 10
    options.SeqBitLength = 10
    YitIdHelper.setIdGenerator(options)
}
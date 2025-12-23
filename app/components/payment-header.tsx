export default function PaymentHeader() {
    return (
      <div className="flex flex-col gap-8">
  
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-semibold">
            Transactions
          </h1>
  
          <div className="flex items-center gap-3">
            <button className="bg-[#6c63ff] text-white px-4 py-2 text-sm">
              + Create Payment
            </button>
  
            <button className="border border-white/20 text-white px-4 py-2 text-sm">
              Evaluation
            </button>
          </div>
        </div>
  
        {/* Tabs */}
        <div className="flex gap-6 border-b border-white/10">
          {[
            'Payments',
            'Payouts',
            'Top-ups',
            'Collected Fees',
            'Transfers',
            'All Activities',
          ].map((item, i) => (
            <button
              key={item}
              className={`
                pb-3 text-sm
                ${i === 0
                  ? 'text-[#6c63ff] border-b-2 border-[#6c63ff]'
                  : 'text-white/50 hover:text-white'
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
  
        {/* Status Cards */}
        <div className="grid grid-cols-6 gap-4">
            {[
                { label: 'All', value: 124, active: true },
                { label: 'Successful', value: 124 },
                { label: 'Refunded', value: 0 },
                { label: 'Disputed', value: 0 },
                { label: 'Failed', value: 0 },
                { label: 'Not Recorded', value: 0 },
            ].map((item) => (
                <div
                key={item.label}
                className={`
                    px-4 py-3 border text-sm
                    ${item.active
                    ? 'border-[#6c63ff] text-[#6c63ff]'
                    : 'border-white/20 text-white/60'
                    }
                `}
                >
                <div>{item.label}</div>
                <div className="mt-1 text-lg font-medium">
                    {item.value}
                </div>
                </div>
            ))}
        </div>

  
        {/* Filter Bar */}
        <div className="flex items-center justify-between border border-white/10 px-4 py-3">
  
          {/* Filters */}
          <div className="flex items-center gap-3">
            {[
              'Date and Time',
              'Amount',
              'Currency',
              'Status',
              'Payment Method',
              'More Filters',
            ].map((label) => (
              <button
                key={label}
                className="flex items-center gap-2 text-sm text-white/70 border border-white/20 px-3 py-1.5 hover:text-white"
              >
                <span className="text-white/40">＋</span>
                {label}
              </button>
            ))}
          </div>
  
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-white border border-white/20 px-3 py-1.5">
              ⤓ Export
            </button>
  
            <button className="flex items-center gap-2 text-sm text-white border border-white/20 px-3 py-1.5">
              ⚙ Edit Columns
            </button>
          </div>
        </div>
      </div>
    );
  }
  